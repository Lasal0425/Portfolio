import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Anton } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/lib/content";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/*
 * Runs before first paint on a full page load. On the home page it hides
 * every unbuilt `[data-build]` element (via the `agents` class) so the
 * agent swarm can assemble the page, and shows the boot screen once per
 * session. Skipped for reduced-motion visitors and anyone who switched the
 * agents off. If the swarm never hydrates, the 6s fallback puts every
 * element back — content is never stuck hidden.
 */
const agentsBootScript = `(function(){try{var d=document.documentElement;if(location.pathname!=='/')return;if(localStorage.getItem('agents')==='off')return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('agents');if(!sessionStorage.getItem('agents-booted')){d.classList.add('booting');sessionStorage.setItem('agents-booted','1');}window.__agentsBoot=Date.now();setTimeout(function(){if(!window.__agentsAlive){d.classList.remove('agents','booting');}},6000);}catch(e){}})();`;

const siteUrl = "https://portfolio-murex-five-37.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lasal Rathnayake",
    template: "%s — Lasal Rathnayake",
  },
  description: profile.tagline,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.tagline,
  url: siteUrl,
  image: `${siteUrl}${profile.headshotUrl}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  email: profile.email,
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.devto, profile.links.medium],
  alumniOf: profile.education?.show
    ? {
        "@type": "CollegeOrUniversity",
        name: profile.education.institution,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plexSans.variable} ${plexMono.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body className="grain flex min-h-screen flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: agentsBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        <div className="relative z-[2] flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
