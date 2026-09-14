"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// The theme isn't known during the server render, so rendering the real
// icon immediately would mismatch on hydration. useSyncExternalStore with
// a no-op subscription is the effect-free way to say "true once mounted on
// the client, false on the server" — setState-in-an-effect for the same
// purpose trips react-hooks/set-state-in-effect.
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * A real toggle, not an OS-only preference — brief §7 asks for working
 * light AND dark modes.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
    >
      {mounted ? (
        isDark ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )
      ) : (
        <span className="block h-4 w-4" />
      )}
    </button>
  );
}
