export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer (AI/ML Integration)",
    company: "Binghamton University",
    period: "Jun 2024 - Jul 2025",
    description: [
      "Built and deployed NLP models (TensorFlow, FastAPI) for real-time sentiment analysis, applying data augmentation across 10K+ adversarial samples to fix class imbalance and improve classification performance.",
      "Built a smart documentation tool using Generative AI to instantly categorize and index user inputs, deployed via containerized microservices (Docker) for real-time search and reduced manual data entry.",
      "Built automated Python pipelines to clean and normalize multi-source vendor data, handling inconsistent schemas and malformed records with mapping tables and validation rules.",
      "Integrated OpenAI Whisper and GPT models to transcribe and classify raw audio into structured clinical summaries, dynamically generating context-aware follow-up questions for patient intake."
    ],
    skills: ["TensorFlow", "FastAPI", "Docker", "OpenAI Whisper", "GPT", "Python"]
  },
  {
    role: "Software Engineer",
    company: "Information Technology Services, Binghamton",
    period: "May 2023 - Jun 2024",
    description: [
      "Built Python REST APIs handling 16K+ daily requests, improving latency and reliability across multiple university applications.",
      "Designed and developed a service-status monitoring system (Python, JS, Oracle) that slashed incident response times and operational overhead by 80% through automated alerting.",
      "Migrated and automated onboarding workflows for 200+ employees, reducing manual processing and errors.",
      "Developed a high-precision network traffic analyzer using Python and Shell, boosting classification accuracy across 100+ distributed endpoints."
    ],
    skills: ["Python", "JavaScript", "Oracle", "REST APIs", "Automation"]
  },
  {
    role: "Junior Software Engineer",
    company: "Areto Labs",
    period: "Jun 2021 - Nov 2021",
    description: [
      "Shipped new features for a client application, driving a 15% lift in user engagement over the following 3 months.",
      "Designed RESTful APIs in Python, cutting latency for a system handling 8K+ daily transactions.",
      "Automated periodic backups on GCP with cron jobs, strengthening system reliability and data integrity.",
      "Boosted PostgreSQL performance by 50% through schema optimization and indexing."
    ],
    skills: ["Python", "REST APIs", "GCP", "PostgreSQL", "Cron"]
  },
  {
    role: "Software Engineer Intern",
    company: "University of Alberta",
    period: "Jan 2021 - Apr 2021",
    description: [
      "Built a cross-platform resource chatbot for marginalized communities handling 100K+ daily queries, using Django, React/Redux, and NLP.",
      "Containerized the application with Docker and orchestrated backend microservices with Kubernetes, improving load distribution during peak usage.",
      "Collaborated with Agile teams to design and deliver a scalable system architecture."
    ],
    skills: ["Django", "React", "Redux", "NLP", "Docker", "Kubernetes"]
  },
  {
    role: "Software Engineer Intern",
    company: "Ada's Team",
    period: "Aug 2020 - Apr 2021",
    description: [
      "Redesigned and rebuilt a client website with React, Tailwind CSS, and MongoDB, onboarding 300+ users.",
      "Reached 70%+ test coverage with React Testing Library and Jest, ensuring accessibility compliance and a robust UX.",
      "Implemented a CI/CD pipeline with GitHub Actions, cutting release time by 50% and improving deployment reliability."
    ],
    skills: ["React", "Tailwind CSS", "MongoDB", "Jest", "GitHub Actions"]
  }
];
