export type ProjectCategory = "digital" | "systems" | "ml";

export interface ShaderPalette {
  color1: string;
  color2: string;
  color3: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  image: string;
  /** Higher-quality asset for the project detail page hero; falls back to `image` when unset. */
  coverImage?: string;
  summary: string;
  overview: string;
  quote: string;
  body: string[];
  stack: string[];
  roles: string;
  repoUrl: string;
  featured?: boolean;
  /** Background gradient colors for the project card, unique per project. */
  shaderColors: ShaderPalette;
}

export const projects: Project[] = [
  {
    slug: "aegis",
    title: "Aegis — Anti-Clickbait Extension",
    category: "ml",
    year: "2025",
    image: "/images/anti-clickbait.png",
    summary: "NLP sentiment scoring for clickbait detection",
    overview:
      "A Chrome extension that scores page content in real time so readers can spot clickbait and gauge sentiment before they click.",
    quote: "The goal was to make sentiment legible before the click, not after.",
    body: [
      "Aegis runs a BERT-based sentiment classifier trained with TensorFlow against the visible text of a page, then surfaces a score directly in the browser chrome so the signal shows up before a reader commits to an article.",
      "The extension keeps inference lightweight enough to run per-tab without noticeable lag, trading some model size for responsiveness.",
    ],
    stack: ["JavaScript", "Python", "TensorFlow", "BERT", "HTML"],
    roles: "Model Training, Extension Development",
    repoUrl: "https://github.com/orackle/aegis",
    featured: true,
    shaderColors: { color1: "#7c3aed", color2: "#4c1d95", color3: "#a78bfa" },
  },
  {
    slug: "kafka-fleet-monitor",
    title: "Kafka Fleet Monitor — Real-Time Anomaly Detection",
    category: "systems",
    year: "2026",
    image: "/images/kafka-fleet-monitor.gif",
    coverImage: "/images/kafka-fleet-monitor-hero.gif",
    summary: "Live telemetry pipeline with ML-based anomaly detection",
    overview:
      "A Kafka-backed fleet monitoring system that streams live node telemetry through an anomaly detector combining z-score bounds and Isolation Forest, with a real-time dashboard and fault-injection controls for testing detection under load.",
    quote: "Anomaly detection you can watch happen, not just read about afterward.",
    body: [
      "A cluster of simulated fleet nodes streams CPU/memory telemetry through Kafka. A dedicated consumer scores each reading against a rolling per-node baseline using z-score bounds and an Isolation Forest model, flagging anomalies in real time without polluting the baseline with the spikes it just flagged.",
      "The FastAPI backend fans out live telemetry and anomaly events over WebSockets to a dashboard that renders per-node sparklines and a running anomaly audit log, plus a fault-injection panel that lets you trigger CPU or memory spikes on demand to watch detection respond live.",
      "Deployed on Railway with serverless sleep-on-inactivity to stay within a free-tier budget, fronted by a static wake-up page that polls the API during cold boot and redirects once the cluster is back up.",
    ],
    stack: ["Kafka", "Python", "FastAPI", "scikit-learn", "WebSockets", "Docker"],
    roles: "Systems Design, ML Pipeline, Backend Development",
    repoUrl: "https://github.com/orackle/kafka-fleet-monitor",
    featured: true,
    shaderColors: { color1: "#ff6a1a", color2: "#c73c00", color3: "#FD4912" },
  },
  {
    slug: "factcheck-agent",
    title: "Fact-Check Agent",
    category: "ml",
    year: "2026",
    image: "/images/factcheck-agent.gif",
    coverImage: "/images/factcheck-agent-hero.gif",
    summary: "Multi-step LangGraph agent, 90% accuracy, cited verdicts",
    overview:
      "A LangGraph agent that verifies claims against live web sources: plans queries, searches, reads pages, extracts evidence, reflects on confidence, loops back to search if needed, then synthesizes a cited verdict.",
    quote: "A model shouldn't grade its own homework after one search.",
    body: [
      "Plan → search → fetch → extract → reflect → synthesize. The reflect step can send the loop back to search again (capped by MAX_SEARCH_ITERATIONS) instead of committing to a verdict on thin evidence.",
      "Every claim in the output is tied to a source URL and an exact quote — no uncited claims. Pluggable LLM (Ollama, OpenAI, Anthropic) and search provider (DuckDuckGo, Tavily).",
      "Eval: 90% (9/10) on a labeled 10-claim test set with llama3.2:3B running locally on CPU. Average 271s/claim. The one miss is documented, not hidden: agent correctly extracted evidence and stance, but the source repeated a historical myth — a retrieval-quality problem, not a graph-wiring bug.",
    ],
    stack: ["LangGraph", "Python", "FastAPI", "Ollama", "BeautifulSoup"],
    roles: "Agent Design, Eval, Backend Development",
    repoUrl: "https://github.com/orackle/factcheck-agent",
    featured: true,
    shaderColors: { color1: "#0d9488", color2: "#134e4a", color3: "#5eead4" },
  },
  {
    slug: "sentiment-api-prod",
    title: "Sentiment API — Production ML Service",
    category: "systems",
    year: "2025",
    image: "/images/sentiment-api-prod.png",
    summary: "DistilBERT sentiment API, deployed on EKS with Terraform",
    overview:
      "A FastAPI service wrapping a DistilBERT sentiment model, built to survive real traffic: async inference, batch scoring, Prometheus metrics, and a Terraform config that stands up the full AWS deployment (EKS, VPC, ECR) from scratch.",
    quote: "A model demo is one request. This had to hold up under a load test.",
    body: [
      "The API wraps a Hugging Face DistilBERT pipeline behind FastAPI, offloading CPU-bound inference to a thread pool so the event loop stays free to serve other requests. A batch endpoint scores a list of texts in one call instead of one request per text.",
      "Every response carries an X-Request-ID header for tracing, and a Prometheus middleware tracks request counts, status codes, and latency per endpoint — the kind of observability a demo script skips but a production service needs.",
      "Terraform provisions the AWS side end to end: an ECR repo, a VPC, and an EKS cluster with an autoscaling node group. Kubernetes manifests handle health-checked rollouts and horizontal pod autoscaling. Load-tested with Locust to check latency held up under concurrent users, not just single requests.",
    ],
    stack: ["FastAPI", "PyTorch", "Transformers", "Docker", "Kubernetes", "Terraform", "AWS", "Prometheus"],
    roles: "Backend Development, ML Deployment, Infrastructure",
    repoUrl: "https://github.com/orackle/sentiment-api-prod",
    featured: true,
    shaderColors: { color1: "#4338ca", color2: "#1e1b4b", color3: "#a5b4fc" },
  },
  {
    slug: "neuron",
    title: "Neuron — Code Snippet Saving Tool",
    category: "digital",
    year: "2024",
    image: "/images/neuron.png",
    summary: "AI-assisted snippet manager with Markdown support",
    overview:
      "A fullstack web app for saving and organizing code snippets, with Ollama AI integration, Markdown support, and secure OAuth login.",
    quote: "A place for the snippets that would otherwise live in scratch files.",
    body: [
      "Built on Next.js with a MongoDB store, Neuron lets snippets be tagged, searched, and annotated in Markdown.",
      "A local Ollama integration suggests tags and summaries for saved snippets without sending code to a third-party API.",
    ],
    stack: ["Next.js", "MongoDB", "Ollama", "OAuth"],
    roles: "Fullstack Development",
    repoUrl: "https://github.com/orackle/neuron",
    featured: true,
    shaderColors: { color1: "#16a34a", color2: "#14532d", color3: "#86efac" },
  },
  {
    slug: "gdtuo-extension",
    title: "Gradient Descent Optimizer",
    category: "ml",
    year: "2024",
    image: "/images/gdtuo.png",
    summary: "Stacked hyperparameter optimization in PyTorch",
    overview:
      "Extended gradient descent by stacking hyperparameters for improved convergence and generalization, tested on CIFAR-100 and Iris.",
    quote: "Stability and generalization, tuned rather than assumed.",
    body: [
      "Implemented in PyTorch, the optimizer adds dampening for training stability and weight decay to curb overfitting on top of a stacked hyperparameter scheme.",
      "Evaluated against CIFAR-100 and Iris to compare convergence behavior across dataset scales.",
    ],
    stack: ["PyTorch", "Jupyter", "Machine Learning", "Research"],
    roles: "Research, Model Training",
    repoUrl: "https://github.com/orackle/gdtuo-extension",
    shaderColors: { color1: "#db2777", color2: "#831843", color3: "#f9a8d4" },
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    category: "digital",
    year: "2024",
    image: "/images/url-shortener.gif",
    summary: "Submit a long URL, get a short one back",
    overview:
      "A service that lets a client submit a long URL, which is then shortened for easier sharing and use.",
    quote: "The smallest useful service, done cleanly.",
    body: [
      "Built with Next.js and a MongoDB-backed key store, styled with Tailwind CSS for a minimal submission flow.",
    ],
    stack: ["Next.js", "Tailwind CSS", "MongoDB"],
    roles: "Fullstack Development",
    repoUrl: "https://github.com/orackle/url_shortener",
    shaderColors: { color1: "#eab308", color2: "#713f12", color3: "#fde047" },
  },
];

export const categories: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Digital", value: "digital" },
  { label: "Systems", value: "systems" },
  { label: "ML", value: "ml" },
];
