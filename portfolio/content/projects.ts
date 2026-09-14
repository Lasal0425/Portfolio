import type { Project } from "./schema";

/**
 * The four projects Lasal starred to feature. All still `status: "draft"` —
 * Phase 2 only needed the real list to size the hero's node field and nav;
 * the actual case studies (architecture, decisions rejected, what broke)
 * are Phase 4 work. Facts below that came from reading the real repos
 * (READMEs, notebook output, fork metadata) are noted as such; anything
 * still guessed-at is marked TODO rather than filled in.
 */
export const projects: Project[] = [
  {
    slug: "knowledge-assistant",
    title: "knowledge_assistant",
    // Confirmed from the repo's own README (Lasal0425/knowledge_assistant).
    summary:
      "A local-first RAG system for querying your own documents — FastAPI and LangChain over Ollama (Llama 3), with pgvector for retrieval.",
    status: "draft",
    repoUrl: "https://github.com/Lasal0425/knowledge_assistant",
    stack: ["Python", "FastAPI", "LangChain", "Ollama (Llama 3)", "PostgreSQL", "pgvector"],
    metrics: [],
    hasCaseStudy: false,
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
    status: "draft",
    repoUrl: "https://github.com/Lasal0425/natcon-website",
    liveUrl: "https://natcon-psi.vercel.app",
    forkOf: "yashbim/nlds-website",
    stack: ["TypeScript", "Next.js"],
    metrics: [],
    hasCaseStudy: false,
    // TODO: diff this against yashbim/nlds-website myself in Phase 4 to
    // describe Lasal's actual changes honestly, rather than asking him to
    // recall them from memory.
  },
  {
    slug: "breast-cancer-detection",
    // Title kept as Lasal named it, though the notebook itself predicts
    // mortality/survival outcome for already-diagnosed patients (a
    // prognosis task), not detection from imaging — worth resolving the
    // naming with him before the case study goes live (see TODO).
    title: "Breast Cancer Detection Model",
    summary:
      "Coursework project predicting mortality outcome and survival months for breast cancer patients from a ~4,000-patient clinical dataset — classification and regression models compared head to head.",
    status: "draft",
    repoUrl: "https://github.com/Lasal0425/ML_Coursework_Breast_Cancer_Detection",
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    metrics: [],
    hasCaseStudy: false,
    // TODO(lasal): I read CW.ipynb directly. Two things to confirm before
    // any number goes on the site:
    // 1. Naming — the repo title says "detection" but the notebook predicts
    //    Mortality_Status/Survival_Months for already-diagnosed patients
    //    (prognosis), not whether a tumor is malignant (detection). Which
    //    framing do you want on the site?
    // 2. Accuracy — an early cell reports 88.9% accuracy (Logistic
    //    Regression) but appears to include Survival_Months as a training
    //    feature, which likely leaks the target (low survival months
    //    correlates directly with the mortality label). A later cell that
    //    excludes it reports 85.0% (Voting Ensemble, AUC 0.68). I'd rather
    //    confirm which run you consider correct than publish either number
    //    unchecked.
  },
  {
    slug: "tul-dashboard",
    title: "TUL Dashboard",
    summary: "TODO(lasal): couldn't confirm which repo this is — see note below.",
    status: "draft",
    stack: [],
    metrics: [],
    hasCaseStudy: false,
    // TODO(lasal): "TUL" doesn't match any repo name, description, or
    // README on your GitHub. Two dashboard repos exist that could plausibly
    // be it — Lasal0425/performance_dashboard ("B2B Performance Dashboard",
    // Next.js + Recharts + Google Sheets CSV) and
    // Lasal0425/natcon-merch-dashboard (live at
    // natcon-merch-dashboard.vercel.app). Is one of these it, or is TUL
    // somewhere else (private repo, different name)?
  },
];
