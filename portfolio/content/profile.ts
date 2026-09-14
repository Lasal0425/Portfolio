import type { Profile } from "./schema";

export const profile: Profile = {
  name: "Lasal Rathnayake",
  role: "AI Engineer",
  // TODO(lasal): replace with the real hero line — one sentence specific
  // enough to exclude 90% of CS students (brief §7). Placeholder for now
  // so Phase 2 has something to lay out against.
  tagline: "AI engineer building LLM applications, RAG pipelines, and agent architectures.",
  location: "Colombo, Sri Lanka",
  email: "lasalrathnayake@gmail.com",
  links: {
    github: "https://github.com/Lasal0425",
    linkedin: "https://www.linkedin.com/in/lasal-rathnayake",
    devto: "https://dev.to/lasal_rathnayake",
    medium: "https://medium.com/@lasalrathnayake",
  },
  resumeUrl: "/Lasal_CV.pdf",
  headshotUrl: "/headshot.jpg",
  // TODO(lasal): confirm institution, exact degree title, dates, and
  // whether to show this section at all (brief §9, question 4).
  education: undefined,
};
