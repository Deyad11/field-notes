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
    "The Thursday titles have been here since yesterday. It is not Thursday.",
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
    "The bug never appeared on my device. The ticket is still open.",
  tech: ["React Native", "iOS", "Android","CSS"],
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
    "Something in the inventory has been expiring soon for as long as anyone can remember.",
  tech: ["React Native", "Redux", "Bedrock API", "Supabase", "Firebase", "OneSignal"],
playStore: "https://play.google.com/store/apps/details?id=com.deyad.freshkeep",
  github: undefined,
},
};

export const entryOrder = [
  "kizuna",
  "inventory-management",
  "vobble",
  "futloo-ai",
];