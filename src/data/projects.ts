export type ProjectCategory = "digital" | "systems" | "ml";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  image: string;
  summary: string;
  overview: string;
  quote: string;
  body: string[];
  stack: string[];
  roles: string;
  repoUrl: string;
  featured?: boolean;
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
  },
  {
    slug: "polly",
    title: "Polly — Novel Creation Tool",
    category: "digital",
    year: "2025",
    image: "/images/polly.png",
    summary: "Scrapes, compiles, and exports serialized web novels",
    overview:
      "A Flask-based tool for scraping WordPress-hosted novels, compiling chapters in order, and generating a downloadable HTML or EPUB file for offline reading.",
    quote: "Chapters scattered across a WordPress feed, turned into one clean book.",
    body: [
      "Polly walks a WordPress novel's chapter index, scrapes each entry with BeautifulSoup, and stitches them into a single ordered document.",
      "The output pipeline supports both HTML and EPUB export, so a serialized web novel can be read the same way as any other book, offline and in order.",
    ],
    stack: ["Flask", "BeautifulSoup", "JavaScript", "HTML", "CSS"],
    roles: "Backend Development, Scraping Pipeline",
    repoUrl: "https://github.com/orackle/polly",
  },
  {
    slug: "course-planner",
    title: "Student Course Assignment System",
    category: "systems",
    year: "2024",
    image: "/images/course-planner.png",
    summary: "Conflict-free course assignment for university students",
    overview:
      "A Java-based system that automatically assigns students to courses without scheduling conflicts, weighing course schedules, student preferences, and prerequisites.",
    quote: "Turning a scheduling headache into a solved constraint problem.",
    body: [
      "The system models course assignment as a constraint satisfaction problem: schedules, prerequisites, and student preferences all feed into the optimizer.",
      "Built on Spring Boot with a MySQL backend, it produces a conflict-free assignment set for an entire student cohort in a single run.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "Algorithm Design"],
    roles: "Backend Development, Algorithm Design",
    repoUrl: "https://github.com/orackle/course-planner-app",
    featured: true,
  },
  {
    slug: "kafka-fleet-monitor",
    title: "Kafka Fleet Monitor — Real-Time Anomaly Detection",
    category: "systems",
    year: "2026",
    image: "/images/kafka-fleet-monitor.gif",
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
  },
];

export const categories: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Digital", value: "digital" },
  { label: "Systems", value: "systems" },
  { label: "ML", value: "ml" },
];
