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
  product: "Professional",
  client: "Freelance",
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
    kind: "Professional · FilamentAi",
    year: 2025,
    type: "product",
    role: "Full-stack",
    wide: true,
    featured: true,
    image:
      "https://plus.unsplash.com/premium_photo-1792697398241-61971de91e50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    images: [],
    summary:
      " Attendance & Productivity Dashboard is an operations dashboard for daily attendance, desk occupancy, and shift productivity. Managers can see who is present, late, on break, or away, then drill into departments, desks, and date ranges. Employee records, departments, and temporary desk changes stay in one place instead of spreadsheets. Reports export to Excel so HR and ops can share the same numbers.",
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
      "Role-based dashboard with attendance cards, trend charts, and a searchable employee attendance table.",
      "Employee, department, and desk management, including temporary desk reassignment and occupancy status.",
      "Shift productivity views: working time, breaks, overtime, and day-pattern summaries.",
      "Filters by date range, department, and performance, plus paginated analytics.",
      "Auth (NextAuth), MongoDB-backed APIs, and Excel report download.",
    ],
  },
  {
    id: "campus-occupancy-identity",
    index: "02",
    title: { lead: "Campus Occupancy", serif: "&", tail: "Identity" },
    kind: "Professional · FilamentAi",
    year: 2025,
    type: "product",
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
    image: "/work/digital-market/digital-market.png",
    images: [
      "/work/digital-market/digital-market-wide.png",
      "/work/digital-market/digital-market-detail.png",
    ],
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
    id: "ppe-safety-analytics",
    index: "04",
    title: {
      lead: "PPE & Workplace",
      serif: "Safety Analytics",
      tail: "Dashboard",
    },
    kind: "Professional · FilamentAi",
    year: 2026,
    type: "product",
    role: "MERN Stack Developer",
    image: "",
    images: [],
    featured: true,
    summary:
      "A computer vision-powered workplace safety analytics dashboard for monitoring PPE compliance and industrial safety events. Processes and stores camera-backed detection data, enabling teams to investigate safety violations, analyze historical trends, and monitor compliance across sites and time periods.",
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Next.js App Router",
      "MUI",
      "HeroUI",
      "Data Visualization",
    ],
    points: [
      "Developed a safety event data pipeline to persist and query camera-based detections, including missing helmet and other PPE violations.",
      "Built dashboard analytics with charts, KPI summaries, and historical trends to monitor workplace safety events.",
      "Implemented date, use-case, and client-based filtering to help users investigate specific safety events across different periods and sites.",
      "Developed Next.js API route handlers for detection data, aggregated counts, and media-related resources consumed by the dashboard.",
      "Designed structured MongoDB/Mongoose data models to support real-time-ready and batch-based updates from edge computer vision systems.",
    ],
  },
  {
    id: "fire-alert-dashboard",
    index: "05",
    title: { lead: "Fire Alert", serif: "Dashboard" },
    kind: "Professional · FilamentAi",
    year: 2026,
    type: "product",
    role: "MERN Stack Developer",
    image: "",
    images: [],
    featured: true,
    summary:
      "A real-time fire and smoke alert monitoring dashboard that tracks camera-based detections across industrial sites. Enables operators to monitor incoming alerts, investigate detection events, and review camera snapshots, timestamps, and detection classifications from a centralized interface.",
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "Tailwind CSS",
      "NextUI",
      "Shadcn",
    ],
    points: [
      "Developed a fire and smoke monitoring dashboard featuring live alert counts and a paginated detection event log.",
      "Integrated Socket.IO for real-time detection updates, allowing newly generated camera events to appear without manual page refreshes.",
      "Implemented date range, camera, status, and detection-class filters for efficient event investigation.",
      "Built an interactive event table with camera snapshots, timestamps, detection classifications, image preview modal, and image download functionality.",
      "Developed login-protected alert configuration settings supporting fire notifications through SMS, email, and buzzer integrations.",
    ],
  },

  {
    id: "this-portfolio",
    index: "06",
    title: { lead: "This", serif: "Portfolio" },
    kind: "Side project · Design + build",
    year: 2026,
    type: "side",
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
  {
    id: "architect-portfolio",
    index: "07",
    title: { lead: "Architect", serif: "Portfolio" },
    kind: "Freelance · Client project",
    year: 2026,
    type: "client",
    role: "Full-stack",
    live: "https://db-arch.vercel.app/",
    image: "",
    images: [],
    featured: true,
    summary:
      "A dynamic portfolio platform for an architecture firm, showcasing architectural projects, editorial content, and client inquiries. Built with a custom content management workflow that allows the client to manage projects and blog posts independently.",
    tags: [
      "Next.js",
      "React",
      "PostgreSQL",
      "Better Auth",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    points: [
      "Developed dynamic project and blog management with complete create, edit, and delete functionality.",
      "Implemented blog commenting functionality, allowing visitors to engage with published articles.",
      "Integrated PostgreSQL for persistent content storage and Better Auth for authentication.",
      "Built a responsive architecture-focused portfolio with dedicated project, blog, and contact sections.",
    ],
  },
  {
    id: "dg-tripathi-law",
    index: "08",
    title: { lead: "DG Tripathi", serif: "& Associates" },
    kind: "Freelance · Client project",
    year: 2025,
    type: "client",
    role: "Frontend",
    live: "https://law-site-five.vercel.app/",
    image: "",
    images: [],
    featured: true,
    summary:
      "A professional multi-page marketing website for DG Tripathi & Associates, a Mumbai-based law firm. Designed to establish the firm's digital presence, showcase legal expertise, improve discoverability, and generate consultation inquiries.",
    tags: ["Next.js", "React.js", "Tailwind CSS", "Vercel", "SEO"],
    points: [
      "Designed and launched a professional website covering legal practice areas, attorney profiles, and firm information.",
      "Developed a blog and insights section to publish legal updates and informational content.",
      "Implemented a contact and consultation-request form to support client lead generation.",
      "Built a responsive, SEO-conscious website to replace the firm's previous offline-only digital presence.",
    ],
  },
  {
    id: "auth-org-platform",
    index: "09",
    title: { lead: "Auth &", serif: "Org Platform" },
    kind: "Personal project · SaaS starter",
    year: 2026,
    type: "side",
    role: "Full-stack",
    live: "https://better-auth-tut-2-0.vercel.app/",
    code: "https://github.com/Mrutunjay113/better-auth-tut-2.0",
    image: "",
    images: [],
    featured: true,
    summary:
      "A production-oriented authentication and multi-tenant SaaS starter built with Next.js and Better Auth. Provides secure account management, organization workspaces, role-based access control, advanced authentication, and Stripe subscription billing in a reusable foundation.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Better Auth",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "TanStack Form",
    ],
    points: [
      "Implemented email/password authentication, email verification, password recovery, welcome emails, and Google/GitHub OAuth.",
      "Integrated TOTP-based two-factor authentication, backup codes, and WebAuthn passkey authentication.",
      "Built account management features covering profile updates, password changes, active sessions, account linking, and account deletion.",
      "Developed organization workspaces with member management, role-based permissions, and email invitations.",
      "Integrated Stripe organization-level subscriptions, plan selection, billing portal, and subscription cancellation workflows.",
    ],
  },
  {
    id: "event-management-platform",
    index: "10",
    title: { lead: "Event", serif: "Management", tail: "Platform" },
    kind: "Academic · MCA project",
    year: 2025,
    type: "side",
    role: "Full-stack",
    code: "https://github.com/Mrutunjay113/event-app",
    image: "",
    images: [],
    summary:
      "A full-stack event management platform built with Next.js, enabling users to discover, create, and manage events worldwide. Features secure authentication, event discovery, personalized listings, ticket purchasing, and order management through Stripe integration.",
    tags: [
      "Next.js 14",
      "TypeScript",
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Clerk",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
    ],
    points: [
      "Developed complete event CRUD functionality with dynamic event creation, editing, deletion, and detail pages.",
      "Integrated Clerk authentication and personalized user profiles for managing individual event listings.",
      "Implemented event discovery with search, filtering, and dynamic category-based navigation.",
      "Integrated Stripe checkout for ticket purchases with payment processing and order tracking.",
      "Built order management, order search, related event recommendations, and user-specific event organization.",
    ],
  },
  {
    id: "ai-image-generator",
    index: "11",
    title: { lead: "AI Image", serif: "Generator" },
    kind: "Academic · MCA project",
    year: 2025,
    type: "side",
    role: "Full-stack",
    code: "https://github.com/Mrutunjay113/AI-Image-Generator",
    image: "",
    images: [],
    summary:
      "An AI-powered image generation platform built using the MERN stack and OpenAI's DALL·E API. Allows users to transform natural language prompts into generated visuals, store generation history, and explore previously created images through a dedicated gallery.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenAI DALL·E API",
      "Axios",
      "JavaScript",
      "CSS",
    ],
    points: [
      "Integrated OpenAI's DALL·E API to generate images from user-provided natural language prompts.",
      "Developed an interactive prompt submission interface with AI image generation workflows.",
      "Built Express.js and Node.js backend APIs to handle generation requests and communicate with the OpenAI API.",
      "Designed MongoDB data models to store generated images and their associated prompt information.",
      "Created a React-based image gallery to explore and revisit previously generated visuals.",
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
