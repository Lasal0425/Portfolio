import type { Profile } from "./schema";

export const profile: Profile = {
  name: "Lasal Rathnayake",
  role: "AI Engineer",
  // Drawn directly from the brief's own positioning statement (§1), not
  // invented — worth a pass of your own editing once the site is live.
  tagline:
    "I build LLM applications, RAG pipelines, and agent systems — and the backend that keeps them running in production.",
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
  education: {
    institution: "Informatics Institute of Technology, Sri Lanka",
    logoUrl: "/logos/iit-logo.png",
    affiliatedWith: {
      name: "University of Westminster",
      logoUrl: "/logos/westminster-logo.svg",
    },
    yearOfStudy: "4th year undergraduate",
    // Confirmed from the resume PDF already in the repo.
    degree: "BSc (Hons) Computer Science",
    startDate: "2023",
    endDate: "Present",
    show: true,
  },
};
