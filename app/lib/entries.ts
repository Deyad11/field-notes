export type Entry = {
  id?: string;
  title: string;
  logged: string;
  status: string;
  observation: string;
  approach: string;
  findings: string;
  anomaly?: string;
  tech: string[];
  github?: string;
  appStore?: string;
  playStore?: string;
  // FIXED: Added optional links structure to type definition safely
  links?: { label: string; url: string }[]; 
};

export const entries: Record<string, Entry> = {
  kizuna: {
    id: "KZ-7F2A",
    title: "Kizuna",
    logged: "May 2026",
    status: "Resolved",
    observation:
      "Anime and manga communities are fragmented across platforms — fans discuss titles in isolation, with no shared space that understands what they're actually watching or reading. The social layer is missing.",
    approach:
      "Built a real-time community platform using Next.js, Tailwind CSS, and Supabase with Google OAuth. Implemented Socket.IO messaging channels and integrated the AniList API for live title and genre metadata. Designed and partially implemented a Jaccard similarity matching algorithm — genre weights shift based on chat engagement, full implementation scoped for next phase.",
    findings:
      "Designed the database schema with forward compatibility in mind — structured for chapter bookmarking, reading progress, and title expansion without restructuring. Title collection is currently seeded manually — the architecture is built for the point when that changes.",
    anomaly:
        "The Thursday titles appeared before Thursday did.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Socket.IO", "AniList API"],
    github: "https://github.com/Deyad11/kizuna.git",
  },
  "inventory-management": {
    id: "IMS-03B",
    title: "Inventory Management System",
    logged: "Apr 2024",
    status: "Resolved",
    observation:
      "Manual inventory tracking creates compounding errors over time — especially across warehouses, suppliers, and orders that all depend on each other being accurate. The goal was a backend system clean enough that other modules could build on it without inheriting its mistakes.",
    approach:
      "Led backend development in a team setting using Spring Boot and MySQL. Designed a relational schema across five models — inventory items, warehouses, warehouse transactions, supplier info, and supplier orders — and developed 5+ RESTful APIs for seamless module integration.",
    findings:
      "The schema held up. Decisions made early around model separation meant new modules could integrate without restructuring. Core inventory operations ran reliably across all five models.",
    anomaly:
      "One transaction is dated three days before the project started.",
    tech: ["Spring Boot", "Java", "MySQL", "REST APIs"],
    github: "https://github.com/Deyad11/project",
  },
  "vobble": {
    id: "VB-114C",
    title: "Vobble",
    logged: "Feb 2026 – Apr 2026",
    status: "Resolved",
    observation:
      "A production React Native application for children's audio learning and games — live users on both app stores. The work was in the details — responsiveness, stability, and the kind of UI consistency users notice when it's missing.",
    approach:
      "Implemented a half-open side drawer with a distinct UI — the drawer expands to full screen rather than sitting over content, a decision I pushed for after realising nothing meaningful existed in the background. Redesigned the Home Screen and rebuilt the friend list UI consistently across multiple screens. Collaborated with design, product, and content teams throughout.",
    findings:
      "Redesign work shipped across multiple screens with consistent full-screen behaviour. Application stability improved. The drawer implementation became the pattern for similar interactions elsewhere in the app.",
    anomaly:
        "The bug has never appeared on my device. The ticket is still open.",
    tech: ["React Native", "iOS", "Android", "CSS"],
    github: undefined,
    appStore: "https://apps.apple.com/us/app/vobble/id6759438576",
    playStore: "https://play.google.com/store/apps/details?id=com.avievinsoninc.vobbleone",
  },
  "futloo-ai": {
    id: "FN-09E1",
    title: "Futloo",
    logged: "Apr 2025 – Sep 2025",
    status: "Resolved",
    observation:
      "Grocery management is a solved problem done poorly. The opportunity was in combining inventory tracking with an AI layer that actually understood what was about to expire.",
    approach:
      "Developed a cross-platform grocery inventory app using React Native and Redux, implementing frontend UI across all user-facing screens with offline support. Built a dual-mode AI recipe chatbot — freeform input and an expiry mode powered by a Supabase function that queries expiring items and injects them as context into the Bedrock API request. Integrated OneSignal push notifications, Supabase Auth, Google OAuth, Firebase Analytics, and Microsoft Clarity.",
    findings:
      "Deployed to the Google Play Store. The expiry-based recommendation mode worked as designed — expiring items surfaced as recipe context automatically, without the user needing to ask. Analytics and Clarity set up for behaviour tracking post-launch.",
    anomaly:
  "The milk has been expiring in three days... for six months.",
    tech: ["React Native", "Redux", "Bedrock API", "Supabase", "Firebase", "OneSignal"],
    playStore: "https://play.google.com/store/apps/details?id=com.deyad.freshkeep",
    github: undefined,
  },
 "product-case-studies": {
id: "LOG-PROD-01",
title: "Product Analysis & Case Studies",
logged: "Ongoing",
status: "Active",

observation:
"Some products solve problems I genuinely have, which makes their rough edges impossible to ignore. While using them, I started documenting moments where the experience felt unintuitive, incomplete, or different from what I expected as a user.",

approach:
"Rather than approaching products from a technical, design, or product perspective, I simply tried to experience them as a user. Documented pain points as they appeared, noted features or improvements I wished existed, and identified areas where the overall experience could be smoother. Consolidated these observations into detailed deep dives, accompanied by proposed solutions, implementation ideas, and longer-term product suggestions where appropriate.",

findings:
"Completed two independent product deep dives based on products I was actively using. Shared the fandom platform analysis directly with the founder, which led to further discussions with the team and a product interview opportunity. As my first formal product interview experience, it broadened my horizons and gave me valuable exposure to product discussions within a startup environment.",

tech: [
"Product Analysis",
"User Journey Mapping",
"Friction Auditing",
"Product Strategy"
],

links: [
{
label: "Job Finder AI Companion Study",
url: "https://app.notion.com/p/Job-Finder-Ai-Companion-3651d194b73380ae87d3f74c7b3a9070",
},
{
label: "Fandom Platform Deep Dive",
url: "https://app.notion.com/p/Fandom-Platform-Product-Deep-Dive-3701d194b7338057ac71f603184b9211",
},
{
label: "Ø-3A",
url: "#",
},
],

anomaly:
"I do not remember creating the third case study.",
},

};

// FIXED: Added product-case-studies key to the ordering map array safely
export const entryOrder = [
  "kizuna",
  "inventory-management",
  "vobble",
  "futloo-ai",
  "product-case-studies",
];