import { Hero } from "@/components/hero";
import { StackSection } from "@/components/stack-section";
import { GitHubActivity } from "@/components/github-activity";

export default function Home() {
  return (
    <main>
      <Hero />
      <StackSection />
      <GitHubActivity />
    </main>
  );
}
