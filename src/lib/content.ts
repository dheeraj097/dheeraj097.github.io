export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "10+", label: "Years of experience" },
  { value: "50+", label: "Projects shipped" },
  { value: "30+", label: "Happy clients" },
  { value: "∞", label: "Cups of coffee" },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES2023)",
      "Redux / Zustand",
      "Tailwind CSS",
      "HTML5 & CSS3",
      "Accessibility (a11y)",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "PHP / Laravel",
      "REST & GraphQL",
      "PostgreSQL / MySQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "GitHub Actions",
      "Nginx",
      "Serverless",
      "Monitoring",
    ],
  },
  {
    title: "Practices",
    skills: [
      "System Design",
      "Performance / Core Web Vitals",
      "Technical SEO",
      "Testing (Jest, Playwright)",
      "Agile / Scrum",
      "Code Review",
      "Mentoring",
      "Clean Architecture",
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    role: "Lead Full Stack Developer",
    company: "Freelance / Consulting",
    period: "2021 — Present",
    description:
      "Partnering with startups and agencies to architect and ship production-grade web platforms end to end.",
    highlights: [
      "Designed scalable Next.js + Node.js architectures serving millions of monthly requests.",
      "Improved Core Web Vitals and SEO, increasing organic traffic by up to 60%.",
      "Mentored junior engineers and established code review and CI/CD standards.",
    ],
  },
  {
    role: "Senior Web Developer",
    company: "Product Company",
    period: "2017 — 2021",
    description:
      "Owned core product features across the stack and led frontend modernization efforts.",
    highlights: [
      "Migrated a legacy monolith to a modular React + REST architecture.",
      "Built reusable component libraries adopted across multiple teams.",
      "Reduced page load time by 45% through code-splitting and caching.",
    ],
  },
  {
    role: "Web Developer",
    company: "Digital Agency",
    period: "2015 — 2017",
    description:
      "Delivered responsive, high-converting websites and web apps for diverse clients.",
    highlights: [
      "Shipped 30+ client websites with a strong focus on performance and SEO.",
      "Implemented analytics and structured data to boost search visibility.",
      "Collaborated closely with designers to deliver pixel-perfect UIs.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    name: "Commerce Platform",
    description:
      "A headless e-commerce storefront built with Next.js, Stripe, and a GraphQL backend. Optimized for speed and conversions.",
    tags: ["Next.js", "GraphQL", "Stripe", "Tailwind"],
    highlight: true,
  },
  {
    name: "Realtime Dashboard",
    description:
      "An analytics dashboard streaming live metrics over WebSockets with role-based access control.",
    tags: ["React", "Node.js", "WebSockets", "PostgreSQL"],
  },
  {
    name: "Component Library",
    description:
      "An accessible, themeable React component library with full documentation and automated visual testing.",
    tags: ["React", "TypeScript", "Storybook", "a11y"],
  },
  {
    name: "SaaS Starter Kit",
    description:
      "A production-ready SaaS boilerplate with authentication, billing, multi-tenancy, and SEO baked in.",
    tags: ["Next.js", "Prisma", "Auth", "SEO"],
    highlight: true,
  },
  {
    name: "Content API",
    description:
      "A flexible, cache-friendly content API powering multiple frontends with a headless CMS workflow.",
    tags: ["NestJS", "Redis", "REST", "Docker"],
  },
  {
    name: "Portfolio CMS",
    description:
      "A lightweight CMS that lets non-technical users update a marketing site without touching code.",
    tags: ["Next.js", "MongoDB", "Tailwind"],
  },
];

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Web Application Development",
    description:
      "End-to-end development of robust, scalable web apps with modern frameworks and clean architecture.",
    icon: "code",
  },
  {
    title: "Frontend Engineering",
    description:
      "Pixel-perfect, accessible, and blazing-fast user interfaces built with React and Next.js.",
    icon: "layout",
  },
  {
    title: "Backend & APIs",
    description:
      "Secure, well-documented REST and GraphQL APIs backed by reliable databases and caching.",
    icon: "server",
  },
  {
    title: "Performance & SEO",
    description:
      "Technical SEO, Core Web Vitals optimization, and structured data to help you rank and convert.",
    icon: "rocket",
  },
];
