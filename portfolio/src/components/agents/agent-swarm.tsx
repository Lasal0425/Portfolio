"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swarm, type SwarmStats } from "./engine";
import { ROSTER } from "./roster";

declare global {
  interface Window {
    __agentsAlive?: boolean;
    __agentsBoot?: number;
  }
}

const BOOT_MS = 1700;

interface LogLine {
  id: number;
  agent: string;
  color: string;
  text: string;
}

function agentsWanted() {
  try {
    if (localStorage.getItem("agents") === "off") return false;
  } catch {}
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Home-page only. Owns the overlay canvas, the boot screen and the dock.
 * The first-paint state (`agents` / `booting` classes on <html>) is set by
 * the inline script in layout.tsx so nothing flashes before hydration;
 * this component takes over from there.
 */
export function AgentSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const swarmRef = useRef<Swarm | null>(null);
  const logId = useRef(0);
  const [enabled, setEnabled] = useState(true);
  const [stats, setStats] = useState<SwarmStats | null>(null);
  const [log, setLog] = useState<LogLine[]>([]);

  // Client-side navigation back to "/" doesn't rerun the inline script —
  // set the build state here, before paint.
  useLayoutEffect(() => {
    window.__agentsAlive = true;
    const html = document.documentElement;
    if (!agentsWanted()) {
      html.classList.remove("agents", "booting");
      const id = requestAnimationFrame(() => setEnabled(false));
      return () => cancelAnimationFrame(id);
    }
    html.classList.add("agents");
    // `booting` is left alone: the swarm effect below clears it when the
    // boot screen finishes (StrictMode's mount/unmount/mount must not skip it).
    return () => {
      html.classList.remove("agents", "boot-done");
    };
  }, []);

  useEffect(() => {
    if (!enabled || !document.documentElement.classList.contains("agents")) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const html = document.documentElement;
    const swarm = new Swarm(canvas);
    swarmRef.current = swarm;
    swarm.onStats = setStats;
    swarm.onLog = (l) =>
      setLog((prev) => [{ id: ++logId.current, ...l }, ...prev].slice(0, 4));
    swarm.onProgress = (p) => {
      if (railRef.current) railRef.current.style.transform = `scaleY(${p})`;
    };

    const booting = html.classList.contains("booting");
    const elapsed = Date.now() - (window.__agentsBoot ?? Date.now());
    const wait = booting ? Math.max(250, BOOT_MS - elapsed) : 60;
    const timer = window.setTimeout(() => {
      if (booting) {
        html.classList.add("boot-done");
        html.classList.remove("booting");
      }
      swarm.start();
    }, wait);

    return () => {
      window.clearTimeout(timer);
      swarm.destroy();
      swarmRef.current = null;
    };
  }, [enabled]);

  function toggle() {
    const html = document.documentElement;
    if (enabled) {
      swarmRef.current?.buildAllInstantly();
      html.classList.remove("agents", "booting");
      try {
        localStorage.setItem("agents", "off");
      } catch {}
      setEnabled(false);
    } else {
      // Everything already built carries data-built, so nothing re-hides.
      document.querySelectorAll<HTMLElement>("[data-build]").forEach((el) => {
        if (!el.dataset.built) el.dataset.built = "instant";
      });
      html.classList.add("agents");
      try {
        localStorage.removeItem("agents");
      } catch {}
      setEnabled(true);
    }
  }

  const pct = stats && stats.total ? Math.round((stats.built / stats.total) * 100) : 0;

  return (
    <>
      <BootScreen />

      {/* Build progress rail on the left edge. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-30 h-full w-[2px] bg-[var(--color-border)]/40">
        <div
          ref={railRef}
          className="h-full w-full origin-top bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30"
        style={{ display: enabled ? "block" : "none" }}
      />

      {/* Dock */}
      <div className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-5">
        <div className="flex max-w-full items-center gap-1 rounded-full border border-[var(--color-border-strong)] bg-[#0d0d0f]/85 p-1 pl-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md sm:gap-2 sm:text-[0.66rem]">
          <span className="flex items-center gap-2 whitespace-nowrap text-[var(--color-fg)]">
            <span
              className={`h-2 w-2 rounded-full ${enabled ? "live-dot bg-[#3ddc84]" : "bg-[var(--color-fg-muted)]"}`}
            />
            {enabled ? `${stats?.live ?? ROSTER.length} agents live` : "agents paused"}
          </span>

          <span className="mx-1 hidden h-4 w-px bg-[var(--color-border-strong)] sm:block" />

          <span className="hidden items-center gap-2 whitespace-nowrap sm:flex" aria-live="polite">
            {stats?.complete ? (
              <span className="text-[#3ddc84]">
                build complete ✓{stats.elapsedMs > 200 ? ` ${(stats.elapsedMs / 1000).toFixed(1)}s` : ""}
              </span>
            ) : (
              <>
                <span>build</span>
                <span className="relative h-1 w-16 overflow-hidden rounded-full bg-[var(--color-border-strong)]">
                  <span
                    className="absolute inset-y-0 left-0 bg-[var(--color-accent)] transition-[width] duration-200"
                    style={{ width: `${enabled ? pct : 100}%` }}
                  />
                </span>
                <span className="tabular-nums text-[var(--color-fg)]">
                  {enabled && stats ? `${stats.built}/${stats.total}` : "—"}
                </span>
              </>
            )}
          </span>

          {enabled && log[0] && (
            <>
              <span className="mx-1 hidden h-4 w-px bg-[var(--color-border-strong)] lg:block" />
              <span key={log[0].id} className="hidden max-w-[17rem] truncate whitespace-nowrap normal-case tracking-normal lg:block" title={log[0].text}>
                <span style={{ color: log[0].color }}>{log[0].agent}</span>{" "}
                <span className="text-[var(--color-fg)]">{log[0].text}</span>
              </span>
            </>
          )}

          <span className="mx-1 hidden h-4 w-px bg-[var(--color-border-strong)] sm:block" />

          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-2 py-1.5 uppercase transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <span
              className={`relative h-3.5 w-6 rounded-full transition-colors ${enabled ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)]"}`}
            >
              <span
                className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all ${enabled ? "left-3" : "left-0.5"}`}
              />
            </span>
            agents {enabled ? "on" : "off"}
          </button>

          <a
            href="#contact"
            className="whitespace-nowrap rounded-full bg-[var(--color-accent)] px-3.5 py-2 font-semibold text-[var(--color-accent-ink)] transition-transform hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Hire me
          </a>
        </div>
      </div>
    </>
  );
}

/** Pure CSS-driven so it animates from the very first paint. */
function BootScreen() {
  return (
    <div
      aria-hidden="true"
      className="boot fixed inset-0 z-[60] flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <div className="relative h-28 w-28">
        <div className="boot-spin absolute inset-0">
          {ROSTER.map((a, i) => {
            const angle = (i / ROSTER.length) * Math.PI * 2;
            return (
              <span
                key={a.name}
                className="boot-item absolute h-2 w-2 rounded-full"
                style={{
                  left: `${50 + Math.cos(angle) * 44}%`,
                  top: `${50 + Math.sin(angle) * 44}%`,
                  background: a.color,
                  boxShadow: `0 0 10px ${a.color}`,
                  animationDelay: `${120 + i * 105}ms`,
                }}
              />
            );
          })}
        </div>
        <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-[var(--color-fg)]">
          LR
        </span>
      </div>

      <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-fg)]">
        Booting agents
      </p>
      <div className="mt-3 h-[2px] w-56 overflow-hidden bg-[var(--color-border)]">
        <div className="boot-bar h-full w-full bg-[var(--color-accent)]" />
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-x-6 gap-y-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] sm:grid-cols-4">
        {ROSTER.map((a, i) => (
          <li key={a.name} className="boot-item flex items-center gap-1.5" style={{ animationDelay: `${120 + i * 105}ms` }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
            {a.name}
            <span className="text-[#3ddc84]">ok</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
