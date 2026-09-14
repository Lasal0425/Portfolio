/**
 * In-memory sliding-window rate limit, keyed by IP. Works out of the box
 * with no signup and no cost, which matters when the whole point of this
 * feature is to run on a $0 budget — the tradeoff is that it's per server
 * instance, not globally distributed, so a determined abuser spread across
 * many serverless instances could exceed the intended limit. For a
 * personal portfolio's realistic traffic that's an acceptable risk; if it
 * ever isn't, swap this module for Upstash's free-tier Redis rate limiter
 * without changing anything that calls it.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

const hits = new Map<string, number[]>();

// Periodically forget IPs with no recent activity so this map doesn't grow
// without bound on a long-lived server instance.
function prune(now: number) {
  for (const [ip, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(ip);
    else hits.set(ip, recent);
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  if (Math.random() < 0.02) prune(now);

  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - timestamps[0])) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return { allowed: true };
}
