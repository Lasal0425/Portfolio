import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only the University of Westminster mark under /public/logos is an
    // SVG (sourced from Wikimedia Commons, no embedded script). The CSP
    // below still blocks scripts inside any SVG served through the image
    // optimizer, as a defense-in-depth measure.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
