import { AgentSwarm } from "@/components/agents/agent-swarm";
import { Hero } from "@/components/home/hero";
import { StackMarquee } from "@/components/home/marquee";
import { WorkSection } from "@/components/home/work-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { AboutSection } from "@/components/home/about-section";
import { WritingSection } from "@/components/home/writing-section";
import { ContactSection } from "@/components/home/contact-section";
import { GitHubActivity } from "@/components/github-activity";

/**
 * One-pager, assembled live: every `data-build` element below starts as a
 * wireframe and is built by the agent swarm as its section scrolls into
 * view (see src/components/agents). Section ids are stable — the Ask
 * panel's citations link to #timeline, #projects, #writing and the
 * per-organisation ids inside the timeline.
 */
export default function Home() {
  return (
    <main>
      <AgentSwarm />
      <Hero />
      <StackMarquee />
      <WorkSection />
      <ExperienceSection />
      <AboutSection />
      <WritingSection />
      <GitHubActivity />
      <ContactSection />
    </main>
  );
}
