import { ROSTER, KIND_VERB, type BuildKind } from "./roster";

/**
 * The swarm engine. Framework-free on purpose: one requestAnimationFrame
 * loop draws every agent, selection box and wireframe ghost onto a single
 * fixed <canvas>, so 12 agents cost the same as one DOM node.
 *
 * Model:
 *  - Every `[data-build]` element starts hidden (see globals.css).
 *  - When a `[data-build-section]` scrolls into view, its unbuilt targets
 *    are queued in DOM order.
 *  - The nearest idle agent takes the next target whose ancestors are
 *    already built (cards before their contents), flies to it, draws a
 *    selection box, fills placeholder bars, then flips `data-built` so the
 *    real element animates in.
 *  - Targets the visitor has already scrolled far past are built instantly
 *    — nobody waits on an animation for content they jumped over.
 */

export interface SwarmStats {
  live: number;
  built: number;
  total: number;
  working: number;
  complete: boolean;
  elapsedMs: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Task {
  el: HTMLElement;
  kind: BuildKind;
  label: string;
  section: string;
  bars: number[]; // relative widths per placeholder row
  agent: Agent | null;
  createdAt: number;
  workStart: number;
  dur: number;
  phase: "travel" | "work" | "fade";
  doneAt: number;
  review?: boolean;
}

interface Agent {
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  task: Task | null;
  nextWander: number;
  spawnDelay: number;
  alive: boolean;
}

// Glyphs of roughly average width only — wide ones (M, W, %, @) would make
// a heading re-wrap mid-scramble.
const SCRAMBLE = "ABCDEFGHKLNOPRSTUVXYZ0123456789/<>_=+";

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function kindOf(el: HTMLElement): BuildKind {
  const k = el.dataset.build as BuildKind;
  return k in KIND_VERB ? k : "block";
}

/** Swap each character for noise, then settle left-to-right. Text nodes are
 *  restored to their exact original data at the end, so React's view of the
 *  DOM is unchanged. */
function scramble(el: HTMLElement, duration = 650) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; text: string }[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.data.trim()) nodes.push({ node, text: node.data });
  }
  if (!nodes.length) return;
  const total = nodes.reduce((n, t) => n + t.text.length, 0);
  // Pin the box while characters churn so nothing below it moves.
  const prevHeight = el.style.height;
  el.style.height = `${el.getBoundingClientRect().height}px`;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    let offset = 0;
    for (const { node, text } of nodes) {
      if (p >= 1) {
        node.data = text;
        continue;
      }
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const settled = (offset + i) / total < p * 1.15 - 0.15;
        out += settled || c === " " || c === "\n" ? c : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      }
      node.data = out;
      offset += text.length;
    }
    if (p < 1) requestAnimationFrame(tick);
    else {
      el.style.height = prevHeight;
    }
  };
  requestAnimationFrame(tick);
}

/** Count a "03" / "13." style number up from zero, keeping its padding. */
function countUp(el: HTMLElement, duration = 900) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let target: Text | null = null;
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    if (/\d/.test(n.data)) {
      target = n;
      break;
    }
  }
  if (!target) return;
  const node = target;
  const original = node.data;
  const m = original.match(/^(\D*)(\d+)([\s\S]*)$/);
  if (!m) return;
  const [, pre, digits, post] = m;
  const end = parseInt(digits, 10);
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    if (p >= 1) {
      node.data = original;
      return;
    }
    node.data = pre + String(Math.round(end * eased)).padStart(digits.length, "0") + post;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export class Swarm {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private vw = 0;
  private vh = 0;
  private raf = 0;
  private last = 0;
  private running = false;

  private agents: Agent[] = [];
  private all: HTMLElement[] = [];
  private pending = new Set<HTMLElement>();
  private queue: Task[] = [];
  private tasks: Task[] = []; // travelling / working / fading
  private rects = new Map<HTMLElement, Rect>(); // page coordinates
  private rectsDirty = true;
  private lastRectRefresh = 0;
  private sectionDone = new Map<string, boolean>();
  private sections: HTMLElement[] = [];
  private activated = new Set<HTMLElement>();

  private io: IntersectionObserver | null = null;
  private ro: ResizeObserver | null = null;
  private pointer = { x: -1, y: -1 };
  private startedAt = 0;
  private completedAt = 0;
  private lastStatsEmit = 0;
  private fontMono = "monospace";
  private origin = { x: 0, y: 0 };

  onStats: (s: SwarmStats) => void = () => {};
  onLog: (line: { agent: string; color: string; text: string }) => void = () => {};
  onProgress: (p: number) => void = () => {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  // ---------------------------------------------------------------- setup

  start(origin?: { x: number; y: number }) {
    if (this.running) return;
    this.running = true;
    this.startedAt = performance.now();
    this.fontMono =
      getComputedStyle(document.body).getPropertyValue("--font-plex-mono").trim() || "monospace";

    this.resize();
    this.origin = origin ?? { x: this.vw / 2, y: this.vh - 40 };

    this.all = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    for (const el of this.all) if (!el.dataset.built) this.pending.add(el);

    const count = this.vw < 640 ? 7 : ROSTER.length;
    this.agents = ROSTER.slice(0, count).map((p, i) => ({
      ...p,
      x: this.origin.x,
      y: this.origin.y,
      vx: rand(-14, 14),
      vy: rand(-22, -8),
      tx: rand(this.vw * 0.15, this.vw * 0.85),
      ty: rand(this.vh * 0.15, this.vh * 0.7),
      task: null,
      nextWander: 0,
      spawnDelay: i * 70,
      alive: false,
    }));

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          // Anything above the section being reached (skipped by an anchor
          // jump or a fast fling) is queued too — it's off-screen, so it
          // gets built instantly and the page above you is never a wireframe.
          for (const s of this.sections) {
            if (this.activated.has(s)) continue;
            this.activateSection(s);
            this.io?.unobserve(s);
            if (s === e.target) break;
          }
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0 },
    );
    this.sections = Array.from(document.querySelectorAll<HTMLElement>("[data-build-section]"));
    this.sections.forEach((s) => this.io!.observe(s));

    this.ro = new ResizeObserver(() => (this.rectsDirty = true));
    this.ro.observe(document.body);
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("pointermove", this.handlePointer, { passive: true });

    this.emitStats(true);
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.io?.disconnect();
    this.ro?.disconnect();
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("pointermove", this.handlePointer);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Agents switched off: everything appears at once, no animation. */
  buildAllInstantly() {
    for (const el of this.all) if (!el.dataset.built) el.dataset.built = "instant";
    this.pending.clear();
    this.queue = [];
    this.tasks = [];
    for (const a of this.agents) a.task = null;
    this.emitStats(true);
  }

  private handleResize = () => {
    this.resize();
    this.rectsDirty = true;
  };

  private handlePointer = (e: PointerEvent) => {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
  };

  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.canvas.width = Math.round(this.vw * this.dpr);
    this.canvas.height = Math.round(this.vh * this.dpr);
    this.canvas.style.width = `${this.vw}px`;
    this.canvas.style.height = `${this.vh}px`;
  }

  private refreshRects(now: number) {
    if (!this.rectsDirty && now - this.lastRectRefresh < 900) return;
    const sx = window.scrollX;
    const sy = window.scrollY;
    for (const el of this.all) {
      const r = el.getBoundingClientRect();
      this.rects.set(el, { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height });
    }
    this.rectsDirty = false;
    this.lastRectRefresh = now;
  }

  /** Viewport-space rect; live for anything an agent is touching. */
  private vrect(el: HTMLElement, live = false): Rect {
    if (live) {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    }
    const r = this.rects.get(el);
    if (!r) return { x: 0, y: 0, w: 0, h: 0 };
    return { x: r.x - window.scrollX, y: r.y - window.scrollY, w: r.w, h: r.h };
  }

  // ---------------------------------------------------------------- tasks

  private activateSection(section: HTMLElement) {
    this.activated.add(section);
    const id = section.dataset.buildSection || section.id || "section";
    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-build]")).filter(
      (el) => this.pending.has(el) && !this.queue.some((t) => t.el === el),
    );
    for (const el of targets) this.queue.push(this.makeTask(el, id));
    if (!this.sectionDone.has(id)) this.sectionDone.set(id, false);
  }

  private makeTask(el: HTMLElement, section: string): Task {
    const kind = kindOf(el);
    const r = el.getBoundingClientRect();
    let rows = 1;
    if (kind === "text") rows = Math.max(1, Math.min(7, Math.round(r.height / 24)));
    else if (kind === "title") rows = Math.max(1, Math.min(4, Math.round(r.height / Math.max(34, Math.min(r.height, 90)))));
    else if (kind === "block") rows = 3;
    const bars = Array.from({ length: rows }, (_, i) =>
      i === rows - 1 && rows > 1 ? rand(0.35, 0.7) : rand(0.75, 1),
    );
    const baseDur: Record<BuildKind, number> = {
      title: 620,
      text: 380 + rows * 110,
      label: 300,
      block: 520,
      media: 1300,
      chip: 220,
      stat: 520,
    };
    return {
      el,
      kind,
      label: el.dataset.label || KIND_VERB[kind].noun,
      section,
      bars,
      agent: null,
      createdAt: performance.now(),
      workStart: 0,
      dur: Math.min(1400, baseDur[kind]),
      phase: "travel",
      doneAt: 0,
    };
  }

  private hasUnbuiltAncestor(el: HTMLElement) {
    let p = el.parentElement;
    while (p && p !== document.body) {
      if (p.dataset.build !== undefined && this.pending.has(p)) return true;
      p = p.parentElement;
    }
    return false;
  }

  private finish(task: Task, now: number, instant = false) {
    const el = task.el;
    this.pending.delete(el);
    el.dataset.built = instant ? "instant" : "1";
    if (!instant) {
      if (task.kind === "title" || task.kind === "label") scramble(el, task.kind === "title" ? 700 : 420);
      if (task.kind === "stat") countUp(el);
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n));
    }
    task.phase = "fade";
    task.doneAt = now;
    if (task.agent) {
      const a = task.agent;
      if (!instant) {
        this.onLog({
          agent: a.name,
          color: a.color,
          text: `${KIND_VERB[task.kind].done} ${task.label}`,
        });
      }
      a.task = null;
      a.nextWander = now + rand(150, 500);
      a.tx = a.x + rand(-60, 60);
      a.ty = a.y + rand(-50, 30);
    }
    // Section complete?
    const sid = task.section;
    if (this.sectionDone.get(sid) === false) {
      const stillPending =
        this.queue.some((t) => t.section === sid) ||
        this.tasks.some((t) => t.section === sid && t.phase !== "fade" && !t.review);
      if (!stillPending) {
        this.sectionDone.set(sid, true);
        if (!instant)
          this.onLog({ agent: "System", color: "#ff5b1f", text: `§ ${sid} shipped ✓` });
      }
    }
  }

  private assign(now: number) {
    if (!this.queue.length) return;
    const idle = this.agents.filter((a) => a.alive && !a.task);
    let i = 0;
    while (i < this.queue.length) {
      const task = this.queue[i];
      if (!this.pending.has(task.el)) {
        this.queue.splice(i, 1);
        continue;
      }
      if (this.hasUnbuiltAncestor(task.el)) {
        i++;
        continue;
      }
      const r = this.vrect(task.el, true);
      const offscreen = r.y + r.h < -this.vh * 0.6 || r.y > this.vh * 1.6;
      if (r.w === 0 || r.h === 0 || offscreen) {
        // Hidden (collapsed disclosure) or scrolled far past: build now.
        this.queue.splice(i, 1);
        this.finish(task, now, true);
        continue;
      }
      if (!idle.length) {
        i++;
        continue;
      }
      // Nearest idle agent takes it.
      const cx = r.x + Math.min(r.w, 40);
      const cy = r.y + Math.min(r.h, 30);
      let best = 0;
      let bestD = Infinity;
      idle.forEach((a, k) => {
        const d = (a.x - cx) ** 2 + (a.y - cy) ** 2;
        if (d < bestD) {
          bestD = d;
          best = k;
        }
      });
      const agent = idle.splice(best, 1)[0];
      this.queue.splice(i, 1);
      // Busy swarm, faster hands.
      const load = this.queue.length;
      if (load > 24) task.dur *= 0.45;
      else if (load > 12) task.dur *= 0.7;
      task.agent = agent;
      task.createdAt = now;
      agent.task = task;
      this.tasks.push(task);
    }
  }

  /** Idle agents sometimes inspect something already built. */
  private maybeReview(agent: Agent, now: number) {
    if (this.pending.size > 0 && this.queue.length > 0) return false;
    if (Math.random() > 0.18) return false;
    if (this.tasks.filter((t) => t.review).length >= 2) return false;
    const visible = this.all.filter((el) => {
      if (!el.dataset.built || el.dataset.build === "chip") return false;
      const r = this.vrect(el);
      return r.w > 40 && r.h > 16 && r.y > 60 && r.y + r.h < this.vh - 80;
    });
    if (!visible.length) return false;
    const el = visible[(Math.random() * visible.length) | 0];
    if (this.tasks.some((t) => t.el === el)) return false;
    const task: Task = {
      el,
      kind: kindOf(el),
      label: "review",
      section: "review",
      bars: [],
      agent,
      createdAt: now,
      workStart: 0,
      dur: rand(900, 1600),
      phase: "travel",
      doneAt: 0,
      review: true,
    };
    agent.task = task;
    this.tasks.push(task);
    return true;
  }

  // ---------------------------------------------------------------- loop

  private frame = (now: number) => {
    if (!this.running) return;
    const dt = Math.min(48, now - this.last) / 16.667;
    this.last = now;
    this.refreshRects(now);
    this.assign(now);
    this.updateTasks(now);
    this.updateAgents(now, dt);
    this.draw(now);
    this.emitStats(false);

    const max = document.documentElement.scrollHeight - this.vh;
    this.onProgress(max > 0 ? window.scrollY / max : 0);

    this.raf = requestAnimationFrame(this.frame);
  };

  private updateTasks(now: number) {
    for (const t of this.tasks) {
      if (t.phase === "travel" && t.agent) {
        const r = this.vrect(t.el, true);
        const d = Math.hypot(t.agent.x - (r.x + 6), t.agent.y - (r.y + 8));
        if (d < 18 || now - t.createdAt > 800) {
          t.phase = "work";
          t.workStart = now;
        }
      } else if (t.phase === "work") {
        if (now - t.workStart >= t.dur) {
          if (t.review) {
            t.phase = "fade";
            t.doneAt = now;
            if (t.agent) {
              t.agent.task = null;
              t.agent.nextWander = now;
            }
          } else {
            this.finish(t, now);
          }
        }
      }
    }
    this.tasks = this.tasks.filter((t) => !(t.phase === "fade" && now - t.doneAt > 500));
  }

  private updateAgents(now: number, dt: number) {
    for (const a of this.agents) {
      if (!a.alive) {
        if (now - this.startedAt > a.spawnDelay) a.alive = true;
        else continue;
      }
      let stiffness = 0.018;
      let damping = 0.86;
      const t = a.task;
      if (t) {
        const r = this.vrect(t.el, true);
        stiffness = 0.07;
        damping = 0.74;
        if (t.phase === "travel") {
          a.tx = r.x + 6;
          a.ty = r.y + 8;
        } else if (t.phase === "work") {
          const p = Math.min(1, (now - t.workStart) / t.dur);
          if (t.review) {
            // Slow trace along the box edge.
            a.tx = r.x + r.w * (0.1 + 0.8 * p);
            a.ty = r.y + r.h + 4;
          } else if (t.kind === "media") {
            a.tx = r.x + r.w * (0.5 + 0.35 * Math.sin(p * Math.PI * 3));
            a.ty = r.y + r.h * p;
          } else {
            const rows = t.bars.length;
            const row = Math.min(rows - 1, Math.floor(p * rows));
            const frac = p * rows - row;
            const rowH = r.h / rows;
            a.tx = r.x + 6 + (r.w - 12) * t.bars[row] * frac;
            a.ty = r.y + rowH * row + rowH * 0.6;
          }
        }
      } else if (now > a.nextWander) {
        if (!this.maybeReview(a, now)) {
          const nearPointer = this.pointer.x >= 0 && Math.random() < 0.12;
          if (nearPointer) {
            a.tx = this.pointer.x + rand(-140, 140);
            a.ty = this.pointer.y + rand(-110, 110);
          } else {
            // Keep idle agents mostly to the margins of the reading column.
            const side = Math.random() < 0.5;
            a.tx = side ? rand(16, this.vw * 0.22) : rand(this.vw * 0.78, this.vw - 90);
            if (this.vw < 640) a.tx = rand(16, this.vw - 90);
            a.ty = rand(80, this.vh - 120);
          }
          a.nextWander = now + rand(1600, 3600);
        }
      }
      a.tx = Math.max(-20, Math.min(this.vw + 20, a.tx));
      a.ty = Math.max(-20, Math.min(this.vh + 20, a.ty));
      a.vx = (a.vx + (a.tx - a.x) * stiffness * dt) * Math.pow(damping, dt);
      a.vy = (a.vy + (a.ty - a.y) * stiffness * dt) * Math.pow(damping, dt);
      const sp = Math.hypot(a.vx, a.vy);
      const max = t ? 46 : 14;
      if (sp > max) {
        a.vx *= max / sp;
        a.vy *= max / sp;
      }
      a.x += a.vx * dt;
      a.y += a.vy * dt;
    }
  }

  private emitStats(force: boolean) {
    const now = performance.now();
    if (!force && now - this.lastStatsEmit < 120) return;
    this.lastStatsEmit = now;
    const total = this.all.length;
    const built = total - this.pending.size;
    const complete = total > 0 && built === total;
    if (complete && !this.completedAt) this.completedAt = now;
    this.onStats({
      live: this.agents.filter((a) => a.alive).length,
      built,
      total,
      working: this.agents.filter((a) => a.task && !a.task.review).length,
      complete,
      elapsedMs: (this.completedAt || now) - this.startedAt,
    });
  }

  // ---------------------------------------------------------------- draw

  private pill(x: number, y: number, text: string, bg: string, size = 10) {
    const c = this.ctx;
    c.font = `600 ${size}px ${this.fontMono}`;
    const w = c.measureText(text).width + 10;
    const h = size + 7;
    c.fillStyle = bg;
    c.beginPath();
    c.roundRect(x, y, w, h, 3);
    c.fill();
    c.fillStyle = "#0b0b0c";
    c.fillText(text, x + 5, y + h - 5);
    return w;
  }

  private draw(now: number) {
    const c = this.ctx;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.clearRect(0, 0, this.vw, this.vh);
    c.textBaseline = "alphabetic";

    // 1. Wireframe ghosts of everything not yet built.
    c.lineWidth = 1;
    c.setLineDash([3, 4]);
    for (const el of this.pending) {
      if (this.tasks.some((t) => t.el === el)) continue;
      const r = this.vrect(el);
      if (r.w === 0 || r.y > this.vh || r.y + r.h < 0) continue;
      c.strokeStyle = "rgba(255,255,255,0.07)";
      c.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5, Math.round(r.w), Math.round(r.h));
      const kind = kindOf(el);
      if (kind === "text" || kind === "title") {
        const rows = kind === "text" ? Math.max(1, Math.min(6, Math.round(r.h / 24))) : 1;
        const rowH = r.h / rows;
        c.fillStyle = "rgba(255,255,255,0.035)";
        for (let i = 0; i < rows; i++) {
          const bh = kind === "title" ? Math.min(rowH * 0.5, 28) : 6;
          c.fillRect(r.x + 6, r.y + rowH * i + (rowH - bh) / 2, (r.w - 12) * (i === rows - 1 && rows > 1 ? 0.55 : 0.92), bh);
        }
      }
    }
    c.setLineDash([]);

    // 2. Active selection boxes.
    for (const t of this.tasks) {
      const a = t.agent;
      const color = a?.color ?? "#ffffff";
      const r = this.vrect(t.el, true);
      if (r.y > this.vh + 50 || r.y + r.h < -50) continue;
      const x = Math.round(r.x) + 0.5;
      const y = Math.round(r.y) + 0.5;
      const w = Math.round(r.w);
      const h = Math.round(r.h);

      let alpha = 1;
      if (t.phase === "fade") alpha = Math.max(0, 1 - (now - t.doneAt) / 500);
      const appear = Math.min(1, (now - t.createdAt) / 260);
      c.globalAlpha = alpha;

      if (t.review) {
        c.setLineDash([2, 3]);
        c.strokeStyle = color;
        c.globalAlpha = alpha * 0.55;
        c.strokeRect(x - 3, y - 3, w + 6, h + 6);
        c.setLineDash([]);
        c.globalAlpha = alpha;
        if (t.phase === "work") this.pill(x - 3, y + h + 6, "✓ REVIEWED", color, 9);
        c.globalAlpha = 1;
        continue;
      }

      // Flash on completion.
      if (t.phase === "fade") {
        c.fillStyle = color;
        c.globalAlpha = 0.14 * alpha;
        c.fillRect(x, y, w, h);
        c.globalAlpha = alpha;
      }

      // Outline draws on from the top-left corner.
      c.strokeStyle = color;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x, y + h * appear);
      c.lineTo(x, y);
      c.lineTo(x + w * appear, y);
      c.moveTo(x + w, y);
      c.lineTo(x + w, y + h * appear);
      c.moveTo(x, y + h);
      c.lineTo(x + w * appear, y + h);
      c.stroke();

      // Corner handles.
      c.fillStyle = color;
      for (const [hx, hy] of [
        [x, y],
        [x + w, y],
        [x, y + h],
        [x + w, y + h],
      ])
        c.fillRect(hx - 2.5, hy - 2.5, 5, 5);

      // Tag + size readout.
      const tagY = y - 19 < 4 ? y + 4 : y - 19;
      this.pill(x, tagY, `${(a?.name ?? "").toUpperCase()} · ${t.label}`, color, 9);
      c.font = `500 9px ${this.fontMono}`;
      c.fillStyle = color;
      c.globalAlpha = alpha * 0.75;
      const dims = `${w}×${h}`;
      c.fillText(dims, x + w - c.measureText(dims).width, y + h + 12);
      c.globalAlpha = alpha;

      // Placeholder bars filling as the agent "types".
      if (t.phase === "work" || t.phase === "fade") {
        const p = t.phase === "fade" ? 1 : Math.min(1, (now - t.workStart) / t.dur);
        if (t.kind === "media") {
          const sy = y + h * p;
          c.fillStyle = color;
          c.globalAlpha = alpha * 0.08;
          c.fillRect(x, y, w, h * p);
          c.globalAlpha = alpha * 0.9;
          c.fillRect(x, sy - 1, w, 2);
          c.globalAlpha = alpha * 0.25;
          c.fillRect(x, sy - 10, w, 10);
        } else if (t.phase === "work") {
          const rows = t.bars.length;
          const rowH = h / rows;
          const bh =
            t.kind === "title" ? Math.max(8, Math.min(rowH * 0.45, 30)) : t.kind === "block" ? 7 : Math.max(5, Math.min(8, rowH * 0.35));
          for (let i = 0; i < rows; i++) {
            const by = y + rowH * i + (rowH - bh) / 2;
            const full = (w - 12) * t.bars[i];
            const f = Math.max(0, Math.min(1, p * rows - i));
            c.globalAlpha = alpha * 0.12;
            c.fillStyle = color;
            c.fillRect(x + 6, by, full, bh);
            c.globalAlpha = alpha * 0.6;
            c.fillRect(x + 6, by, full * f, bh);
          }
        }
      }

      // Tether from agent to box while travelling.
      if (t.phase === "travel" && a) {
        c.globalAlpha = 0.45;
        c.setLineDash([2, 4]);
        c.beginPath();
        c.moveTo(a.x, a.y);
        c.lineTo(x, y);
        c.stroke();
        c.setLineDash([]);
      }
      c.globalAlpha = 1;
    }

    // 3. Agents.
    for (const a of this.agents) {
      if (!a.alive) continue;
      const x = a.x;
      const y = a.y;
      c.save();
      c.globalAlpha = a.task ? 1 : 0.7;
      c.translate(x, y);
      c.shadowColor = a.color;
      c.shadowBlur = a.task ? 14 : 6;
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, 15);
      c.lineTo(4, 11.5);
      c.lineTo(6.8, 17.5);
      c.lineTo(9.2, 16.4);
      c.lineTo(6.5, 10.6);
      c.lineTo(11.5, 10.6);
      c.closePath();
      c.fillStyle = a.color;
      c.fill();
      c.shadowBlur = 0;
      c.strokeStyle = "rgba(0,0,0,0.85)";
      c.lineWidth = 1.2;
      c.stroke();
      c.restore();

      const working = a.task && !a.task.review && a.task.phase === "work";
      const label = working ? `${a.name} · ${KIND_VERB[a.task!.kind].doing}…` : a.name;
      c.globalAlpha = a.task ? 1 : 0.6;
      this.pill(x + 12, y + 16, label.toUpperCase(), a.color, 9);
      c.globalAlpha = 1;
    }
  }
}
