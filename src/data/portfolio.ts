export type Education = {
  degree: string;
  major: string;
  institution: string;
  period: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: readonly string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  achievements: readonly string[];
};

export const aboutParagraphs: readonly string[] = [
  "I'm a Full-Stack Developer with over a year of experience building and maintaining production web and mobile applications for local and international clients. I work across frontend and backend development, translating business requirements into practical software solutions, integrating APIs and third-party services, and delivering applications across web, iOS, and Android.",
  "My experience spans logistics, e-commerce, and business management systems, with a focus on building reliable applications that solve real operational problems.",
];

export const education: Education = {
  degree: "Bachelor of Science in Information Technology",
  major: "Major in Business Analytics",
  institution: "Batangas State University",
  period: "2021–2025",
};

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Quasar",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["PHP", "Laravel", "REST APIs"],
  },
  {
    id: "mobile",
    title: "Mobile",
    skills: ["React Native (iOS and Android)"],
  },
  {
    id: "databases-services",
    title: "Databases & Services",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    skills: [
      "Git & GitHub",
      "Docker",
      "Linux",
      "Figma",
      "WordPress",
      "Power BI",
      "PostHog",
      "VMware",
      "AI-assisted development tools",
      "Project management tools",
    ],
  },
];

// Newest first. The Experience page renders this array in order.
export const experience: readonly ExperienceEntry[] = [
  {
    role: "Full-Stack Developer",
    company: "Rooche Digital IT Solutions",
    period: "March 2026 – Present",
    achievements: [
      "Develop and maintain production web and mobile applications for local and international clients, delivering new features, bug fixes, and ongoing improvements.",
      "Work with REST APIs, webhooks, third-party integrations, and automated background processes to support application functionality.",
      "Develop and maintain a React Native application for iOS and Android, resolving production issues and implementing new features.",
      "Use analytics and AI-assisted development tools to understand user behavior, investigate issues, and support efficient development.",
    ],
  },
  {
    role: "System/Project Coordinator",
    company: "Metro Mobilia Corporation",
    period: "September 2025 – February 2026",
    achievements: [
      "Analyzed existing business processes and translated stakeholder requirements into system workflows, database structures, and application features.",
      "Developed and tested core functionality for a centralized Inventory & Project Tracking System, refining features based on stakeholder feedback.",
      "Deployed the system across multiple branches, improving inventory visibility, project monitoring, and the efficiency of reporting and branch updates.",
    ],
  },
  {
    role: "Front-End Developer Intern",
    company: "Consultare Inc. Group (Remote, USA)",
    period: "February 2025 – May 2025",
    achievements: [
      "Developed four Vue.js/Quasar modules and Bootstrap-based electronic forms to support operational requirements.",
      "Collaborated with developers and stakeholders to implement interface improvements and deliver features within project timelines.",
      "Contributed to quality assurance testing and technical documentation to improve system reliability and user experience.",
    ],
  },
];
