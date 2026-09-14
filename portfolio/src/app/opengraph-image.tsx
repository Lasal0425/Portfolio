import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = "Lasal Rathnayake — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Matches the site's actual dark-mode tokens (src/app/globals.css) rather
// than a one-off image-only palette.
const INK = "#0e1116";
const FG = "#e7e5dd";
const FG_MUTED = "#8a8f98";
const ACCENT = "#e8734a";
const EDGE = "#6b8f8c";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: INK,
          padding: "80px",
          position: "relative",
        }}
      >
        {/* A few static nodes echoing the home page's node field — the
            same visual idea, not a literal render of it. */}
        <div style={{ position: "absolute", top: 90, right: 140, width: 10, height: 10, borderRadius: 999, background: EDGE, display: "flex" }} />
        <div style={{ position: "absolute", top: 200, right: 260, width: 8, height: 8, borderRadius: 999, background: FG_MUTED, display: "flex" }} />
        <div style={{ position: "absolute", top: 130, right: 380, width: 8, height: 8, borderRadius: 999, background: FG_MUTED, display: "flex" }} />
        <div style={{ position: "absolute", top: 300, right: 180, width: 8, height: 8, borderRadius: 999, background: EDGE, display: "flex" }} />

        <div style={{ display: "flex", width: 18, height: 18, borderRadius: 999, background: ACCENT, marginBottom: 28 }} />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: FG }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: FG_MUTED, marginTop: 12 }}>
          {profile.role} · {profile.location}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: FG, marginTop: 40, maxWidth: 820, lineHeight: 1.4 }}>
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
