export type Entry = {
  title: string;
  logged: string;
  status: string;
  observation: string;
  approach: string;
  findings: string;
  anomaly?: string;
  tech: string[];
  github?: string;
};

export const entries: Record<string, Entry> = {
  kizuna: {
    title: "Kizuna",
    logged: "May 2026",
    status: "Resolved",
    observation:
      "Anime and manga communities are fragmented across platforms — fans discuss titles in isolation, with no shared space that understands what they're actually watching or reading. The social layer is missing.",
    approach:
      "Engineered a real-time community platform using Next.js, Tailwind CSS, and Supabase with Google OAuth. Built custom Socket.IO messaging channels and integrated the AniList API to pull live title and genre metadata. Developed a Jaccard similarity matching algorithm that dynamically shifts genre weights based on user chat engagement.",
    findings:
      "Designed database schemas to scale for upcoming features, including chapter bookmarking and reading progress tracking. The matching algorithm surfaced connections between users that static profile-matching would have missed.",
    anomaly:
      "One user's match score recalculated overnight, without any new messages logged.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Socket.IO", "AniList API"],
    github: "https://github.com/Deyad11/kizuna.git",
  },
  "inventory-management": {
    title: "Inventory Management System",
    logged: "Apr 2024",
    status: "Resolved",
    observation:
      "Manual inventory tracking creates compounding errors over time. The goal was a reliable backend system with clean APIs that other modules could build on.",
    approach:
      "Led backend development using Spring Boot and MySQL. Designed a scalable database schema and developed 5+ RESTful APIs for seamless module integration.",
    findings:
      "The system handled all core inventory operations reliably. Schema decisions made early allowed new modules to integrate without restructuring.",
    tech: ["Spring Boot", "MySQL", "REST APIs"],
  },
  vobble: {
    title: "Vobble",
    logged: "Feb 2026",
    status: "Resolved",
    observation:
      "A production React Native application with live users on both app stores. The work was in the details — responsiveness, stability, and the kind of UI consistency users notice when it's missing.",
    approach:
      "Contributed to core feature implementation, diagnosed and resolved critical production bugs, and delivered UI/UX improvements across multiple screens as part of an ongoing redesign. Collaborated with design, product, and content teams.",
    findings:
      "Improved application stability and reduced user-facing issues. Redesign work shipped across multiple screens with consistent cross-device behaviour.",
    tech: ["React Native", "iOS", "Android"],
  },
  "futloo-ai": {
    title: "Futloo AI",
    logged: "Apr 2025",
    status: "Resolved",
    observation:
      "Grocery management is a solved problem done poorly. The opportunity was in combining inventory tracking with an AI layer that actually understood what was about to expire.",
    approach:
      "Developed a cross-platform grocery inventory app using React Native and Redux. Built a dual-mode AI recipe chatbot integrated with the Bedrock API — generating recipes from user input and recommending meals based on expiring inventory. Integrated OneSignal push notifications, Supabase Auth, Google OAuth, Firebase Analytics, and Microsoft Clarity.",
    findings:
      "Deployed to the Google Play Store. The chatbot's expiry-based recommendation mode proved more useful than freeform input — users engaged with suggestions they hadn't thought to ask for.",
    tech: [
      "React Native",
      "Redux",
      "Bedrock API",
      "Supabase",
      "Firebase",
      "OneSignal",
    ],
  },
};

export const entryOrder = [
  "kizuna",
  "inventory-management",
  "vobble",
  "futloo-ai",
];