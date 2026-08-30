export interface TechStackGroup {
  category: string;
  items: string[];
}

export const techStack: TechStackGroup[] = [
  { category: "Generative AI / LLM", items: ["RAG", "Prompt Engineering", "Vector Embeddings", "FAISS", "LangChain"] },
  { category: "Machine Learning", items: ["TensorFlow", "PyTorch", "scikit-learn", "NLP", "Sentence-Transformers"] },
  { category: "Languages", items: ["Python", "SQL", "JavaScript"] },
  { category: "Backend / Infra", items: ["FastAPI", "Django", "Flask", "Node.js", "PostgreSQL", "MongoDB", "Kafka"] },
  { category: "Cloud / MLOps", items: ["GCP", "Docker", "Kubernetes"] }
];
