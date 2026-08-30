export interface Certification {
  issuer: string;
  title: string;
  date?: string;
}

export const certifications: Certification[] = [
  { issuer: "IBM SkillsBuild", title: "AI Fundamentals: Foundations for Understanding AI" },
  { issuer: "IBM SkillsBuild", title: "Code Generation and Optimization Using IBM Granite" },
  { issuer: "LangChain Academy", title: "Foundation: Introduction to Deep Agents" },
  { issuer: "IBM", title: "Machine Learning with Python" },
  { issuer: "IBM", title: "Data Analysis with Python", date: "Jul 2026" },
  { issuer: "Google Cloud Skills Boost", title: "Digital Transformation with Google Cloud", date: "Oct 2025" },
  { issuer: "Google", title: "Introduction to Generative AI", date: "Oct 2025" },
  { issuer: "Microsoft", title: "Microsoft Azure AI Essentials Professional Certificate", date: "Oct 2025" },
];
