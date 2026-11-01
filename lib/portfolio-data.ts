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
  { label: "Work", href: "#work" },
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

export interface Project {
  id: string;
  index: string;
  title: { lead: string; serif: string; tail?: string };
  kind: string;
  summary: string;
  tags: string[];
  points: string[];
}

export const projects: Project[] = [
  {
    id: "attendance-productivity",
    index: "01",
    title: { lead: "Attendance", serif: "&", tail: "Productivity" },
    kind: "Analytics · Full-stack",
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
    title: { lead: "Digital Marketplace", serif: "self-driven" },
    kind: "Commerce · Side project",
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
];

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
