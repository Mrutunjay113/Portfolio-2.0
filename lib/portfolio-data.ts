/**
 * All portfolio content lives here so presentation components stay data-agnostic.
 * Copy is taken verbatim from the original Portfolio.html design.
 */

export const profile = {
  name: "Mrutunjay Yadav",
  email: "mrutunjay765@gmail.com",
  phone: { label: "+91 82864 74981", href: "tel:+918286474981" },
  github: { label: "/Mrutunjay113", href: "https://github.com/Mrutunjay113" },
  linkedin: {
    label: "/mrutunjay-yadav",
    href: "https://linkedin.com/in/mrutunjay-yadav-48a856168",
  },
} as const;

export const resume = {
  href: "/resume.pdf",
  filename: "Mrutunjay-Yadav-Resume.pdf",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "/work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export const heroSocials: NavLink[] = [
  { label: "GitHub", href: profile.github.href },
  { label: "LinkedIn", href: profile.linkedin.href },
  // { label: "Email", href: `mailto:${profile.email}` },
];

/** Copy + structure for the two-column hero (left narrative, right code card). */
export const hero = {
  status: "Open to new roles & freelance",
  firstName: "Mrutunjay",
  lastName: "Yadav",
  lede: {
    before: "I’m a MERN stack developer with ",
    accent: "3+ years ",
    after:
      "of experience building dashboards that turn camera and sensor data into numbers people can act on. I own features from the Next.js interface to the MongoDB query to the Vercel release.",
  },
  code: {
    caption: "Schema → API → UI → shipped",
    objectName: "dev",
    fields: [
      { key: "role", value: "MERN Stack Developer" },
      { key: "at", value: "FilamentAi" },
      { key: "based", value: "Mumbai, India" },
      { key: "ships", value: "end to end" },
      {
        key: "stack",
        value: [
          "React.js",
          "Next.js",
          "Node.js",
          "Express.js",
          "TypeScript",
          "MongoDB",
        ],
      },
    ],
  },
} as const;

export const facts = [
  { value: "3+", label: "Years shipping" },
  { value: "3", label: "Full-stack platforms" },
  { value: "8.19", label: "MCA CGPI" },
] as const;

export const experience = {
  company: "FilamentAi Pvt. Ltd. · Mumbai",
  headline: {
    lead: "Computer-vision analytics for",
    serif: "safer workplaces",
  },
  steps: [
    { when: "Aug 2023", title: "Frontend Developer", current: false },
    {
      when: "Nov 2023",
      title: "Moved to MERN Stack Developer",
      current: false,
    },
    { when: "Present", title: "End-to-end feature owner", current: true },
  ],
  duties: [
    {
      label: "APIs",
      text: "I designed, documented and shipped secure REST APIs for auth, user management and reporting. They all follow the same rules for validation, error handling and versioned routes.",
    },
    {
      label: "Data",
      text: "I designed the MongoDB schemas, compound indexes and aggregation pipelines behind the analytics apps.",
    },
    {
      label: "Performance",
      text: "I made the apps faster with Next.js Server Components, code splitting, lazy loading and better rendering strategies.",
    },
    {
      label: "Auth",
      text: "I built session management and role-based access control (RBAC) with Better Auth.",
    },
    {
      label: "UI System",
      text: "I built a library of reusable, modular components in React and Tailwind CSS that the product modules share.",
    },
    {
      label: "CV / AI",
      text: "I worked with the AI team to bring computer-vision events into the product: PPE compliance, fire and smoke detection, safety violations and attendance.",
    },
    {
      label: "Ops",
      text: "I handle environment config and production deployments on Vercel.",
    },
  ],
} as const;

export type ProjectType = "client" | "product" | "side";

export const projectTypeLabels: Record<"all" | ProjectType, string> = {
  all: "All",
  client: "Client",
  product: "Product",
  side: "Side project",
};

export interface Project {
  id: string;
  index: string;
  title: { lead: string; serif: string; tail?: string };
  kind: string;
  year: number;
  type: ProjectType;
  role: string;
  summary: string;
  tags: string[];
  points: string[];
  live?: string;
  code?: string;
  /**
   * Cover shown on index hover, grid cards, and the case hero.
   * Local: `/work/attendance.jpg` in `public/work/`. Remote: full https URL.
   */
  image?: string;
  /** Extra case-study shots: [wide, detail]. Same URL rules as `image`. */
  images?: string[];
  wide?: boolean;
  featured?: boolean;
}

export const workPage = {
  lede: "Everything I've built, from client analytics platforms to products I made on my own.",
  ctaNote: "Got something you'd like built?",
} as const;

export function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

export function displaySummary(summary: string) {
  const text = summary.replace(/^Placeholder:\s*/i, "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function projectCategory(project: Project) {
  return project.kind.split("·")[0]?.trim() ?? project.kind;
}

export function projectEngagement(type: ProjectType) {
  if (type === "client") return "Professional";
  return projectTypeLabels[type];
}

export function projectDisplayName(project: Project) {
  return [project.title.lead, project.title.serif, project.title.tail]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
}

export function projectCrumb(project: Project) {
  return `${project.title.lead} ${projectCategory(project)}`.toUpperCase();
}

export function projectRoleLabel(project: Project) {
  if (project.role === "Full-stack") return "Full-stack Developer";
  return project.role;
}

export const projects: Project[] = [
  {
    id: "attendance-productivity",
    index: "01",
    title: { lead: "Attendance", serif: "&", tail: "Productivity" },
    kind: "Analytics · Full-stack",
    year: 2025,
    type: "client",
    role: "Full-stack",
    wide: true,
    featured: true,
    image: "",
    images: [],
    summary:
      "A workplace analytics platform. It turns camera-based desk-occupancy timelines into attendance, productive hours, breaks, overtime and department-level reports.",
    tags: [
      "Next.js",
      "React",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "TanStack Query",
      "Tailwind",
      "Zod",
    ],
    points: [
      "An admin dashboard with interactive charts, trend views and filters for date range and department, so managers can compare teams over time.",
      "TanStack Query handles caching, and paths revalidate after each mutation, so the dashboard always matches the database.",
      "Fast queries using lean reads, field projections, compound indexes, aggregation pipelines and parallel database calls.",
    ],
  },
  {
    id: "campus-occupancy-identity",
    index: "02",
    title: { lead: "Campus Occupancy", serif: "&", tail: "Identity" },
    kind: "Realtime · Full-stack",
    year: 2025,
    type: "client",
    role: "Full-stack",
    featured: true,
    image: "",
    images: [],
    summary:
      "Real-time occupancy tracking across buildings, floors and locations. It covers assembly-point headcounts, identity enrollment and face-event review.",
    tags: [
      "Next.js",
      "MongoDB",
      "Better Auth",
      "Socket.IO",
      "TanStack Query",
      "Recharts",
      "Zod",
      "Tailwind",
    ],
    points: [
      "Invite-based enrollment with photo uploads, approval steps and an audit trail for every review decision.",
      "Live updates over Socket.IO, falling back to Server-Sent Events and REST snapshots when needed.",
      "REST APIs built as Next.js Route Handlers for occupancy, spaces, identity, attendance and visitors, connected to external face-recognition services.",
      "Daily pre-aggregations, compound indexes and parallel queries keep historical reports fast.",
    ],
  },
  {
    id: "digital-marketplace",
    index: "03",
    title: { lead: "Digital", serif: "Marketplace" },
    kind: "Commerce · Side project",
    year: 2024,
    type: "side",
    role: "Solo build",
    featured: true,
    code: "https://github.com/Mrutunjay113",
    image: "",
    images: [],
    summary:
      "An end-to-end marketplace for digital products. Sellers list products, buyers pay and then get secure download links that expire.",
    tags: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Stripe",
      "Payload CMS",
      "Shadcn UI",
      "MongoDB",
    ],
    points: [
      "Stripe checkout where webhooks drive the order status. Download endpoints use signed URLs so only paying customers get the files.",
      "Payload CMS is the headless admin, and its typed tRPC procedures keep the frontend type-safe end to end.",
      "Admin dashboards show revenue, top-selling products and download counts.",
    ],
  },
  {
    id: "ppe-compliance-console",
    index: "04",
    title: { lead: "PPE Compliance", serif: "Console" },
    kind: "Client · Frontend lead",
    year: 2024,
    type: "client",
    role: "Frontend lead",
    image: "",
    images: [],
    summary:
      "Placeholder: a review console for computer-vision PPE violations, with evidence snapshots and shift-wise compliance scores.",
    tags: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
  {
    id: "fire-smoke-alerts",
    index: "05",
    title: { lead: "Fire & Smoke", serif: "Alerts" },
    kind: "Client · Full-stack",
    year: 2024,
    type: "client",
    role: "Full-stack",
    image: "",
    images: [],
    summary:
      "Placeholder: a real-time incident feed for fire and smoke detection events, with acknowledgement and escalation flows.",
    tags: ["React", "Node.js", "Socket.IO", "MongoDB"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
  {
    id: "visitor-management",
    index: "06",
    title: { lead: "Visitor", serif: "Management" },
    kind: "Client · Full-stack",
    year: 2024,
    type: "client",
    role: "Full-stack",
    wide: true,
    image: "",
    images: [],
    summary:
      "Placeholder: visitor pre-registration, QR check-in and host notifications for corporate campuses.",
    tags: ["Next.js", "MongoDB", "Zod", "TanStack Form"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
  {
    id: "auth-starter-kit",
    index: "07",
    title: { lead: "Auth", serif: "Starter Kit" },
    kind: "Product · Solo build",
    year: 2025,
    type: "product",
    role: "Solo build",
    code: "https://github.com/Mrutunjay113",
    image: "",
    images: [],
    summary:
      "Placeholder: a reusable Next.js starter with Better Auth, RBAC, sessions and protected route patterns.",
    tags: ["Next.js", "Better Auth", "TypeScript", "MongoDB"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
  {
    id: "realtime-chat",
    index: "08",
    title: { lead: "Realtime", serif: "Chat" },
    kind: "Side project · Solo build",
    year: 2023,
    type: "side",
    role: "Solo build",
    code: "https://github.com/Mrutunjay113",
    image: "",
    images: [],
    summary:
      "Placeholder: a one-to-one and group chat app with presence, typing indicators and read receipts.",
    tags: ["React", "Express.js", "Socket.IO", "MongoDB"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
  {
    id: "task-board",
    index: "09",
    title: { lead: "Task", serif: "Board" },
    kind: "Side project · Solo build",
    year: 2023,
    type: "side",
    role: "Solo build",
    code: "https://github.com/Mrutunjay113",
    image: "",
    images: [],
    summary:
      "Placeholder: a Kanban board with drag-and-drop, labels and optimistic updates.",
    tags: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
  {
    id: "this-portfolio",
    index: "10",
    title: { lead: "This", serif: "Portfolio" },
    kind: "Product · Design + build",
    year: 2026,
    type: "product",
    role: "Design + build",
    code: "https://github.com/Mrutunjay113",
    image: "",
    images: [],
    summary:
      "Placeholder: the site you're on, designed and built as a type-led, minimal portfolio.",
    tags: ["HTML", "CSS", "JavaScript"],
    points: [
      "Replace with your key contribution.",
      "Replace with a measurable outcome.",
      "Replace with a technical highlight.",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const stack = [
  {
    label: "Frontend",
    items: ["Next.js", "React.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  { label: "Backend", items: ["Node.js", "Express.js"] },
  { label: "Database", items: ["MongoDB", "MySQL"] },
  {
    label: "Libraries",
    items: ["TanStack Query", "TanStack Form", "Better Auth"],
  },
  { label: "Languages", items: ["JavaScript", "TypeScript", "Java"] },
] as const;

export const education = [
  {
    index: "01",
    degree: { lead: "MCA" },
    institution:
      "Thakur Institute of Management Studies, Career Development & Research",
    score: { value: "8.19", scale: "CGPI" },
  },
  {
    index: "02",
    degree: { lead: "BSc", serif: "Computer Science" },
    institution: "M.V.L.U",
    score: { value: "8.5", scale: "CGPA" },
  },
] as const;

export const contactInfo = {
  offScreen: { label: "Off the screen", value: "Cricket & Games" },
  location: { label: "Location", value: "Mumbai, Maharashtra" },
  resume: { label: "Resume", value: "Download Resume" },
} as const;
