import type { Project } from "./schema";

/**
 * The projects Lasal starred to feature (TUL Dashboard dropped — client
 * project, not shown). Each has a real MDX case study under
 * content/projects/<slug>.mdx. Facts that came from reading the actual
 * repos (READMEs, notebook output, fork diffs) are noted as such; anything
 * still unconfirmed is marked TODO rather than filled in.
 */
export const projects: Project[] = [
  {
    slug: "knowledge-assistant",
    title: "knowledge_assistant",
    // Confirmed from the repo's own README (Lasal0425/knowledge_assistant).
    summary:
      "A local-first RAG system for querying your own documents — FastAPI and LangChain over Ollama (Llama 3), with pgvector for retrieval.",
    status: "ready",
    repoUrl: "https://github.com/Lasal0425/knowledge_assistant",
    stack: ["Python", "FastAPI", "LangChain", "Ollama (Llama 3)", "PostgreSQL", "pgvector"],
    metrics: [],
    hasCaseStudy: true,
    // TODO(lasal): what's the actual ingestion scale / any latency numbers
    // you've observed? Real numbers only, per brief — nothing invented yet.
  },
  {
    slug: "natcon-website",
    title: "NatCon Website",
    // Confirmed from the repo itself: it's live, and GitHub's fork metadata
    // confirms the brief's claim that it started as yashbim/nlds-website.
    summary:
      "Official website for AIESEC in Sri Lanka's National Conference 2026 — homepage, countdown, registration, and a merch store.",
    status: "ready",
    repoUrl: "https://github.com/Lasal0425/natcon-website",
    liveUrl: "https://natcon-psi.vercel.app",
    forkOf: "yashbim/nlds-website",
    stack: ["TypeScript", "Next.js"],
    metrics: [],
    hasCaseStudy: true,
  },
  {
    slug: "breast-cancer-detection",
    // Title kept as Lasal named the repo. The case study itself is honest
    // about what the model actually predicts (mortality/survival outcome
    // for already-diagnosed patients — prognosis, not imaging-based
    // detection) rather than silently going along with "detection."
    title: "Breast Cancer Detection Model",
    summary:
      "Coursework project predicting mortality outcome and survival months for breast cancer patients from a ~4,000-patient clinical dataset — classification and regression models compared head to head.",
    status: "ready",
    repoUrl: "https://github.com/Lasal0425/ML_Coursework_Breast_Cancer_Detection",
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    // The leak-free run: Voting Ensemble (Logistic Regression + KNN),
    // excluding Survival_Months as a feature. The other cell in the same
    // notebook reports 88.9% but trains on Survival_Months, which directly
    // leaks the mortality label — not published, see the case study.
    metrics: [
      { label: "Classification accuracy", value: "85.0%" },
      { label: "Classification AUC", value: "0.68" },
      { label: "Survival regression RMSE", value: "22.9 months" },
    ],
    hasCaseStudy: true,
  },
];
