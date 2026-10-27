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

export type Project = {
  slug: string;
  title: string;
  organization: string;
  summary: string;
  technologies: readonly string[];
};

export type CaseStudyItem = {
  title: string;
  description: string;
};

export type ProjectPreview = CaseStudyItem & {
  id: "dashboard" | "inventory-scan" | "delivery-confirmation";
};

export type InventoryCaseStudy = {
  role: {
    intro: readonly string[];
    contributions: readonly string[];
  };
  problem: {
    intro: readonly string[];
    challenges: readonly CaseStudyItem[];
    closing: string;
  };
  solution: {
    intro: readonly string[];
    qrIntro: string;
    qrFeatures: readonly CaseStudyItem[];
    closing: string;
  };
  features: readonly CaseStudyItem[];
  outcomes: {
    intro: string;
    improvements: readonly CaseStudyItem[];
    closing: string;
  };
  previews: readonly ProjectPreview[];
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

export const inventoryProject: Project = {
  slug: "inventory-project-tracking",
  title: "Inventory & Project Tracking System",
  organization: "Metro Mobilia Corporation",
  summary:
    "A centralized web application that brings branch inventory records, stock movements, project tracking, and delivery confirmation into one shared platform.",
  technologies: [
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "jQuery",
    "AJAX",
  ],
};

// Add future approved projects here so the gallery remains data-driven.
export const projects: readonly Project[] = [inventoryProject];

export const inventoryProjectTrackingCaseStudy: InventoryCaseStudy = {
  role: {
    intro: [
      "I took ownership of an existing, partially developed Inventory & Project Tracking System and was responsible for completing its development, testing, refinement, and deployment.",
      "Working closely with my lead, I gathered additional business-process information, clarified operational requirements, and translated them into application functionality.",
    ],
    contributions: [
      "Reviewing and continuing the existing application implementation.",
      "Completing and enhancing its frontend and backend functionality.",
      "Working with the existing database structure and implementing the changes needed to support application requirements.",
      "Testing, debugging, and refining features based on stakeholder feedback.",
      "Preparing and deploying the completed system for organizational use.",
    ],
  },
  problem: {
    intro: [
      "Metro Mobilia Corporation managed inventory and project information across multiple branches using separate spreadsheets and manual reporting processes.",
      "Branch personnel had to encode records manually and submit updates, making it difficult to maintain a centralized, reliable view of inventory levels and project progress.",
    ],
    challenges: [
      {
        title: "Limited inventory visibility",
        description:
          "Monitoring stock across branches required gathering information from separate records.",
      },
      {
        title: "Manual reporting",
        description:
          "Consolidating branch updates involved repetitive data collection and encoding.",
      },
      {
        title: "Human error",
        description:
          "Manual spreadsheet entry increased the risk of inaccurate or inconsistent information.",
      },
      {
        title: "Difficult project monitoring",
        description:
          "Tracking project status and progress across branches was inefficient.",
      },
    ],
    closing:
      "The organization needed a centralized system that could simplify record management, improve information reliability, and make inventory and project updates easier to monitor.",
  },
  solution: {
    intro: [
      "The Inventory & Project Tracking System is a centralized web application developed to simplify inventory management and project monitoring across multiple branches.",
      "It brings previously fragmented spreadsheet-based workflows into a shared platform where personnel can manage inventory records, monitor stock movements, and track project progress.",
    ],
    qrIntro:
      "To reduce repetitive manual encoding and improve operational workflows, I implemented two QR code-based features:",
    qrFeatures: [
      {
        title: "Inventory QR Scanning",
        description:
          "Automatically retrieves item information and records the corresponding stock transaction.",
      },
      {
        title: "QR Code-Based Delivery Confirmation",
        description:
          "Allows recipients to scan a delivery QR code, access a dedicated confirmation page, and upload photos. Upon submission, the system automatically updates the delivery status.",
      },
    ],
    closing:
      "By centralizing these processes, the application helps streamline daily operations, improve information accessibility, and support more consistent inventory and project monitoring.",
  },
  features: [
    {
      title: "QR Code-Based Inventory Transactions",
      description:
        "Implemented QR code scanning functionality that automatically retrieves item information and records stock transactions, reducing repetitive manual encoding during inventory operations.",
    },
    {
      title: "QR Code-Based Delivery Confirmation",
      description:
        "Developed a recipient-facing workflow where scanning a delivery QR code redirects the recipient to a confirmation page. The recipient uploads photo documentation, and the system automatically updates the delivery status upon submission.",
    },
  ],
  outcomes: {
    intro:
      "The completed Inventory & Project Tracking System provided Metro Mobilia Corporation with a more centralized approach to managing inventory, projects, and delivery-related operations across multiple branches.",
    improvements: [
      {
        title: "Improved inventory visibility",
        description:
          "Made it easier to access organized inventory records, monitor stock movements, and review information across branches.",
      },
      {
        title: "Reduced reliance on manual encoding",
        description:
          "Introduced QR code-based inventory transactions to simplify item retrieval and reduce repetitive data entry, helping minimize opportunities for encoding errors.",
      },
      {
        title: "More efficient reporting and coordination",
        description:
          "Centralized branch information to simplify the collection of updates and preparation of operational reports.",
      },
      {
        title: "Easier project monitoring",
        description:
          "Provided a shared platform for reviewing project records and tracking progress.",
      },
      {
        title: "Streamlined delivery confirmation",
        description:
          "Enabled recipients to submit photo documentation through a QR code-based workflow, automatically updating the associated delivery status upon submission.",
      },
    ],
    closing:
      "Overall, the project replaced several disconnected manual processes with integrated digital workflows, supporting more accessible information and more consistent day-to-day operations.",
  },
  previews: [
    {
      id: "dashboard",
      title: "Inventory dashboard preview",
      description:
        "A placeholder for a sanitized view of branch inventory records, stock movements, and summary information.",
    },
    {
      id: "inventory-scan",
      title: "Inventory QR scan preview",
      description:
        "A placeholder for a sanitized view of item retrieval and stock transaction entry through QR scanning.",
    },
    {
      id: "delivery-confirmation",
      title: "Delivery confirmation preview",
      description:
        "A placeholder for a sanitized view of recipient photo uploads and the resulting delivery status update.",
    },
  ],
};
