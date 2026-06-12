"use client";
import { useState, useRef, useEffect } from "react";
import { entries, entryOrder } from "../lib/entries";
import ContactStamp from "./ContactStamp";
import { useReveal } from "../hooks/useReveal";

type PageId = "about" | "index" | "entry-left" | "entry-right";

const PAGE_ORDER: PageId[] = ["about", "index", "entry-left", "entry-right"];

const C = {
  cream: "#F2EFE9",
  ink: "#1A1612",
  inkMid: "#524633",
  inkLight: "#574C40",
  inkSubhead: "#6E6052",
  inkFaint: "#C8B89A",
  inkFaintest: "#E0D8CC",
  accent: "#B33622",
  tagBg: "#E8E0D5",
  spiral: "#9A8A7A",
  bg: "#1C1A18",
  visitedInk: "#581C87",
  visitedInkLight: "#7C3AED",
  pencilLead: "#78716C",
};

// ── Spiral wire component ──────────────────────────────────────────────────
function SpiralWire() {
  const loops = 18;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0px",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: loops }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: `2px solid ${C.spiral}`,
            borderBottom: "2px solid transparent",
            flexShrink: 0,
            marginLeft: i === 0 ? 0 : "-4px",
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

// ── Section label ──────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.62rem",
        fontWeight: "700",
        color: C.inkSubhead,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        margin: "0 0 0.35rem",
      }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: `1px solid ${C.inkFaint}`,
        margin: "0.2rem 0",
      }}
    />
  );
}

// ── Page content components ────────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <div>
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: C.ink,
            margin: 0,
          }}
        >
          Deepanshu Yadav
        </h1>
        <p
          style={{
            fontSize: "0.8rem",
            color: C.inkMid,
            margin: "0.2rem 0 0",
            letterSpacing: "0.05em",
          }}
        >
          Full-Stack &amp; Mobile Developer
        </p>
      </div>

      <Divider />

      <p
        style={{
          fontSize: "0.88rem",
          color: "#2A2218",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        I tend to notice patterns before I understand them — in code, in people,
        in stories.
      </p>

      <div style={{ fontSize: "0.82rem", color: C.inkMid, lineHeight: "1.6" }}>
        <p style={{ margin: 0, fontWeight: "600", color: C.ink }}>Vobble</p>
        <p style={{ margin: 0 }}>React Native Developer · Feb – Apr 2026</p>
        <p style={{ margin: "0.4rem 0 0", fontWeight: "600", color: C.ink }}>
          Futloo
        </p>
        <p style={{ margin: 0 }}>Android Developer · Apr – Sep 2025</p>
      </div>

      <Divider />

      <div style={{ fontSize: "0.78rem", color: C.inkMid, lineHeight: "1.6" }}>
        <p style={{ margin: "0 0 0.2rem" }}>
          React Native · React.js · Next.js · Node.js
        </p>
        <p style={{ margin: 0 }}>Java · Spring Boot · MySQL · Supabase</p>
      </div>

      <Divider />

      <div style={{ fontSize: "0.82rem", color: C.inkMid, lineHeight: "1.5" }}>
        <p style={{ margin: 0 }}>B.Tech CSE — NorthCap University</p>
        <p style={{ margin: 0 }}>
          Full-Stack Specialization · CGPA 9.03 · 2026
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <a
          href="https://www.linkedin.com/in/deepanshu-yadav-b240a7127/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.78rem",
            color: C.inkLight,
            textDecoration: "underline",
            letterSpacing: "0.03em",
          }}
        >
          View LinkedIn &#8594;
        </a>
        <a
          href="https://github.com/Deyad11"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.78rem",
            color: C.inkLight,
            textDecoration: "underline",
            letterSpacing: "0.03em",
          }}
        >
          View GitHub &#8594;
        </a>
      </div>
      <p
        style={{
          fontSize: "0.82rem",
          color: C.inkLight,
          lineHeight: "1.75",
          margin: "0.4rem 0 0",
          fontStyle: "italic",
        }}
      >
        Last edited at a time I don&apos;t remember.
      </p>
    </div>
  );
}

function IndexPage({
  onOpenEntry,
  visitedSlugs,
}: {
  onOpenEntry: (slug: string) => void;
  visitedSlugs: string[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
      <h2
        style={{
          fontSize: "0.68rem",
          fontWeight: "700",
          color: C.inkSubhead,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          margin: 0,
          textAlign: "center",
        }}
      >
        Index
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: "700",
            color: C.inkSubhead,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            margin: 0,
          }}
        >
          Experience
        </p>

        <button
          onClick={() => onOpenEntry("vobble")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
          }}
          className="index-link"
        >
          <p
            className="entry-title"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              margin: 0,
              color: visitedSlugs.includes("vobble") ? C.visitedInk : C.ink,
            }}
          >
            Vobble
          </p>
          <p
            className="entry-date"
            style={{
              fontSize: "0.75rem",
              margin: "0.2rem 0 0",
              letterSpacing: "0.05em",
              color: visitedSlugs.includes("vobble")
                ? C.visitedInkLight
                : C.inkLight,
            }}
          >
            Logged: Feb – Apr 2026 · Resolved
          </p>
        </button>

        <button
          onClick={() => onOpenEntry("futloo-ai")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
          }}
          className="index-link"
        >
          <p
            className="entry-title"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              margin: 0,
              color: visitedSlugs.includes("futloo-ai") ? C.visitedInk : C.ink,
            }}
          >
            Futloo
          </p>
          <p
            className="entry-date"
            style={{
              fontSize: "0.75rem",
              margin: "0.2rem 0 0",
              letterSpacing: "0.05em",
              color: visitedSlugs.includes("futloo-ai")
                ? C.visitedInkLight
                : C.inkLight,
            }}
          >
            Logged: Apr – Sep 2025 · Resolved
          </p>
        </button>

        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: "700",
            color: C.inkSubhead,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            margin: "0.4rem 0 0",
          }}
        >
          Projects
        </p>

        <button
          onClick={() => onOpenEntry("kizuna")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
          }}
          className="index-link"
        >
          <p
            className="entry-title"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              margin: 0,
              color: visitedSlugs.includes("kizuna") ? C.visitedInk : C.ink,
            }}
          >
            Kizuna
          </p>
          <p
            className="entry-date"
            style={{
              fontSize: "0.75rem",
              margin: "0.2rem 0 0",
              letterSpacing: "0.05em",
              color: visitedSlugs.includes("kizuna")
                ? C.visitedInkLight
                : C.inkLight,
            }}
          >
            Logged: May 2026 · Resolved
          </p>
        </button>

        <button
          onClick={() => onOpenEntry("inventory-management")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
          }}
          className="index-link"
        >
          <p
            className="entry-title"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              margin: 0,
              color: visitedSlugs.includes("inventory-management")
                ? C.visitedInk
                : C.ink,
            }}
          >
            Inventory Management System
          </p>
          <p
            className="entry-date"
            style={{
              fontSize: "0.75rem",
              margin: "0.2rem 0 0",
              letterSpacing: "0.05em",
              color: visitedSlugs.includes("inventory-management")
                ? C.visitedInkLight
                : C.inkLight,
            }}
          >
            Logged: Apr 2024 · Resolved
          </p>
        </button>

        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: "700",
            color: C.inkSubhead,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            margin: "0.4rem 0 0",
          }}
        >
          Writings
        </p>

        <button
          onClick={() => onOpenEntry("product-case-studies")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
          }}
          className="index-link"
        >
          <p
            className="entry-title"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              margin: 0,
              color: visitedSlugs.includes("product-case-studies")
                ? C.visitedInk
                : C.ink,
            }}
          >
            Product Case Studies
          </p>
          <p
            className="entry-date"
            style={{
              fontSize: "0.75rem",
              margin: "0.2rem 0 0",
              letterSpacing: "0.05em",
              color: visitedSlugs.includes("product-case-studies")
                ? C.visitedInkLight
                : C.inkLight,
            }}
          >
            Logged: Independent Deep Dives · Active
          </p>
        </button>
      </div>
    </div>
  );
}

interface EntryLeftPageProps {
  slug: string;
  onBackToIndex: () => void;
  revealedId: string;
}

function EntryLeftPage({
  slug,
  onBackToIndex,
  revealedId,
}: EntryLeftPageProps) {
  const entry = entries[slug];
  if (!entry) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
      <button
        onClick={onBackToIndex}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: "0.75rem",
          color: C.inkLight,
          letterSpacing: "0.05em",
          cursor: "pointer",
          textAlign: "left",
          textDecoration: "underline",
        }}
      >
        ← Index
      </button>

      <div>
        <h1
          style={{
            fontSize: "1.15rem",
            fontWeight: "700",
            color: C.ink,
            margin: 0,
          }}
        >
          {entry.title}
        </h1>
        <p
          style={{
            fontSize: "0.72rem",
            color: C.inkLight,
            margin: "0.3rem 0 0",
            letterSpacing: "0.05em",
          }}
        >
          Logged: {entry.logged} · {entry.status}
        </p>
        {entry.id && (
          <div
            style={{
              fontSize: "1.05rem",
              color: C.accent,
              margin: "0.2rem 0 0",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-handwritten)",
              fontWeight: "500",
            }}
          >
            {revealedId.split("").map((char, index) => (
              <span key={index} className="ink-reveal-char">
                {char}
              </span>
            ))}
          </div>
        )}
      </div>

      <Divider />

      <div>
        <Label>Observation</Label>
        <p
          style={{
            fontSize: "0.86rem",
            color: "#2A2218",
            lineHeight: "1.8",
            margin: 0,
          }}
        >
          {entry.observation}
        </p>
      </div>

      <div>
        <Label>Approach</Label>
        <p
          style={{
            fontSize: "0.86rem",
            color: "#2A2218",
            lineHeight: "1.8",
            margin: 0,
          }}
        >
          {entry.approach}
        </p>
      </div>
    </div>
  );
}

interface EntryRightPageProps {
  slug: string;
  onBackToIndex: () => void;
  revealedAnomaly: string;
}

function EntryRightPage({
  slug,
  onBackToIndex,
  revealedAnomaly,
}: EntryRightPageProps) {
  const entry = entries[slug];
  if (!entry) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
      <button
        onClick={onBackToIndex}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: "0.75rem",
          color: C.inkLight,
          letterSpacing: "0.05em",
          cursor: "pointer",
          textAlign: "left",
          textDecoration: "underline",
        }}
      >
        ← Index
      </button>

      <div>
        <Label>Findings</Label>
        <p
          style={{
            fontSize: "0.86rem",
            color: "#2A2218",
            lineHeight: "1.8",
            margin: 0,
          }}
        >
          {entry.findings}
        </p>
      </div>

      {entry.anomaly && revealedAnomaly && (
        <div style={{ marginTop: "0.5rem" }}>
          <p
            style={{
              fontSize: "1.05rem",
              color: C.accent,
              lineHeight: "1.8",
              margin: 0,
              fontStyle: "italic",
              fontFamily: "var(--font-handwritten)",
            }}
          >
            {revealedAnomaly.split(" ").map((word, wordIdx) => (
              <span
                key={wordIdx}
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
              >
                {word.split("").map((char, charIdx) => (
                  <span key={charIdx} className="ink-reveal-char">
                    {char}
                  </span>
                ))}
                <span style={{ display: "inline-block", whiteSpace: "pre" }}>
                  {" "}
                </span>
              </span>
            ))}
          </p>
        </div>
      )}

      <Divider />

      <div>
        <Label>Components</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {entry.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.73rem",
                color: C.inkMid,
                background: C.tagBg,
                padding: "0.2rem 0.55rem",
                borderRadius: "2px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* STATIC APPMIN LINK REDIRECTS */}
        {entry.github && (
          <a
            href={entry.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "0.8rem",
              fontSize: "0.82rem",
              color: C.inkMid,
              textDecoration: "underline",
              letterSpacing: "0.05em",
            }}
          >
            View on GitHub →
          </a>
        )}
        {entry.appStore && (
          <a
            href={entry.appStore}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "0.5rem",
              fontSize: "0.82rem",
              color: C.inkMid,
              textDecoration: "underline",
              letterSpacing: "0.05em",
            }}
          >
            View App Store →
          </a>
        )}
        {entry.playStore && (
          <a
            href={entry.playStore}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "0.5rem",
              fontSize: "0.82rem",
              color: C.inkMid,
              textDecoration: "underline",
              letterSpacing: "0.05em",
            }}
          >
            View on Play Store →
          </a>
        )}

        {/* FIXED: Dynamic array compilation loops mapping multi-links cleanly */}
        {entry.links &&
          entry.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "0.5rem",
                fontSize: "0.82rem",
                textDecoration: "underline",
                letterSpacing: "0.05em",
                // Stylistic distinction for unlinked static anomalies like Ø-3A
                color: link.url === "#" ? C.pencilLead : C.inkMid,
                cursor: link.url === "#" ? "default" : "pointer",
              }}
            >
              {link.label} →
            </a>
          ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function MobileJournal() {
  const [pageIndex, setPageIndex] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [visible, setVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reducedMotionActive, setReducedMotionActive] = useState(false);
  const [visitedSlugs, setVisitedSlugs] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // ── FIX 1: OMNIDIRECTIONAL DUAL-AXIS DRAG POSITION TRACKING ──
  const [stampPos, setStampPos] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const initialStampPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionActive(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) =>
      setReducedMotionActive(e.matches);
    mediaQuery.addEventListener("change", listener);

    try {
      const stored = localStorage.getItem("mobile_visited_history");
      if (stored) setVisitedSlugs(JSON.parse(stored));
    } catch (e) {
      console.warn("History retrieval locked:", e);
    }
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const selectedEntry = activeSlug ? entries[activeSlug] : null;
  const fallbackId = selectedEntry?.id ?? "";
  const fallbackAnomaly = selectedEntry?.anomaly ?? "";

  const revealedIdString = useReveal(
    fallbackId,
    reducedMotionActive ? 0 : 2500,
    reducedMotionActive ? 0 : 55,
  );
  const revealedAnomalyString = useReveal(
    fallbackAnomaly,
    reducedMotionActive ? 0 : 2500,
    reducedMotionActive ? 0 : 30,
  );

  const revealedId = reducedMotionActive ? fallbackId : revealedIdString;
  const revealedAnomaly = reducedMotionActive
    ? fallbackAnomaly
    : revealedAnomalyString;

  const totalPages = activeSlug ? 4 : 2;
  const currentPage = PAGE_ORDER[pageIndex];

  function navigate(toIndex: number, dir: "forward" | "back") {
    if (animating) return;
    if (reducedMotionActive) {
      setPageIndex(toIndex);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      return;
    }
    setDirection(dir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setPageIndex(toIndex);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      setVisible(true);
      setTimeout(() => setAnimating(false), 220);
    }, 180);
  }

  function goForward() {
    if (pageIndex < PAGE_ORDER.length - 1) navigate(pageIndex + 1, "forward");
  }

  function goBack() {
    if (pageIndex > 0) navigate(pageIndex - 1, "back");
  }

  function openEntry(slug: string) {
    setActiveSlug(slug);
    if (!visitedSlugs.includes(slug)) {
      const updated = [...visitedSlugs, slug];
      setVisitedSlugs(updated);
      try {
        localStorage.setItem("mobile_visited_history", JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed syncing mobile history state:", e);
      }
    }
    navigate(2, "forward");
  }

  function backToIndex() {
    navigate(1, "back");
  }

  const canGoBack = pageIndex > 0;
  const canGoForward = currentPage === "about" || currentPage === "entry-left";

  const slideOut = direction === "forward" ? "-60px" : "60px";
  const slideIn = direction === "forward" ? "60px" : "-60px";

  // ── DUAL-AXIS POINTER EVENTS ──
  const handleDragStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    startPointer.current = { x: clientX, y: clientY };
    initialStampPos.current = { ...stampPos };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startPointer.current.x;
    const deltaY = clientY - startPointer.current.y;
    setStampPos({
      x: initialStampPos.current.x + deltaX,
      y: initialStampPos.current.y + deltaY,
    });
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const onGlobalMove = (e: MouseEvent) =>
      handleDragMove(e.clientX, e.clientY);
    const onGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onGlobalEnd = () => handleDragEnd();

    window.addEventListener("mousemove", onGlobalMove);
    window.addEventListener("mouseup", onGlobalEnd);
    window.addEventListener("touchmove", onGlobalTouchMove, { passive: false });
    window.addEventListener("touchend", onGlobalEnd);

    return () => {
      window.removeEventListener("mousemove", onGlobalMove);
      window.removeEventListener("mouseup", onGlobalEnd);
      window.removeEventListener("touchmove", onGlobalTouchMove);
      window.removeEventListener("touchend", onGlobalEnd);
    };
  }, [stampPos]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: C.bg,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "min(440px, 100vw)",
          minHeight: "100dvh",
          background: C.cream,
          position: "relative",
          boxShadow: "0 0 80px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── SPIRAL BINDING ── */}
        <div
          style={{
            position: "relative",
            height: "44px",
            background: "#E8E0D4",
            borderBottom: `1px solid ${C.inkFaint}`,
            flexShrink: 0,
            zIndex: 4,
          }}
        >
          <SpiralWire />
        </div>

        {/* ── TAP ZONE: PREVIOUS ── */}
        {canGoBack && (
          <button
            onClick={goBack}
            style={{
              position: "absolute",
              top: "44px",
              left: 0,
              right: 0,
              height: "64px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Previous page"
          >
            <span
              className="pulse-text-mobile"
              style={{
                fontSize: "0.76rem",
                color: C.pencilLead,
                letterSpacing: "0.18em",
                fontFamily: "monospace",
                fontWeight: 600,
                animation: "pulsePrompt 2.5s ease-in-out infinite",
              }}
            >
              ↑ PREV PAGE ...
            </span>
          </button>
        )}

        {/* ── PAGE CONTENT CONTAINER ── */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: canGoBack ? "72px" : "1.5rem",
            paddingLeft: "1.6rem",
            paddingRight: "1.6rem",
            paddingBottom: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "1px",
              background: `linear-gradient(to bottom, transparent 0%, ${C.inkFaintest} 8%, ${C.inkFaintest} 92%, transparent 100%)`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              opacity: visible ? 1 : 0,
              transform: reducedMotionActive
                ? "none"
                : visible
                  ? "translateY(0)"
                  : `translateY(${animating && !visible ? slideOut : slideIn})`,
              transition: reducedMotionActive
                ? "none"
                : visible
                  ? "opacity 0.22s ease, transform 0.22s ease"
                  : "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            {currentPage === "about" && <AboutPage />}
            {currentPage === "index" && (
              <IndexPage onOpenEntry={openEntry} visitedSlugs={visitedSlugs} />
            )}
            {currentPage === "entry-left" && activeSlug && (
              <EntryLeftPage
                slug={activeSlug}
                onBackToIndex={backToIndex}
                revealedId={revealedId}
              />
            )}
            {currentPage === "entry-right" && activeSlug && (
              <EntryRightPage
                slug={activeSlug}
                onBackToIndex={backToIndex}
                revealedAnomaly={revealedAnomaly}
              />
            )}
          </div>
        </div>

        {/* ── FIX 2: RIGHTMOST HEADER-LEVEL PAGE INDICATOR ── */}
        {/* <div
          style={{
            position: "absolute",
            top: "54px",
            right: "1rem",
            fontSize: "0.65rem",
            color: C.inkLight,
            fontFamily: "monospace",
            letterSpacing: "0.22em",
            zIndex: 25,
            pointerEvents: "none",
            wordSpacing: "0.4rem",
          }}
        >
          PAGE {pageIndex + 1} / {totalPages}
        </div> */}

        {/* ── TAP ZONE: NEXT ── */}
        {canGoForward && (
          <button
            onClick={goForward}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "64px",
              background: `linear-gradient(to top, ${C.cream} 40%, transparent)`,
              border: "none",
              borderTop: `1px solid ${C.inkFaintest}`,
              cursor: "pointer",
              zIndex: 20,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "1.1rem",
            }}
            aria-label="Next page"
          >
            <span
              className="pulse-text-mobile"
              style={{
                fontSize: "0.76rem",
                color: C.pencilLead,
                letterSpacing: "0.18em",
                fontFamily: "monospace",
                fontWeight: 600,
                animation: "pulsePrompt 2.5s ease-in-out infinite",
              }}
            >
              NEXT PAGE ↓ ...
            </span>
          </button>
        )}

        {/* ── PLAYABLE OMNIDIRECTIONAL DRAGGABLE STAMP CONTAINER ── */}
        <div
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          style={{
            position: "absolute",
            zIndex: 100,
            bottom: canGoForward ? "4.5rem" : "1.5rem",
            right: "1.5rem",
            // Upgraded to full 2D hardware matrix translation via translate3d
            transform: `translate3d(${stampPos.x}px, ${stampPos.y}px, 0)`,
            cursor: isDragging.current ? "grabbing" : "grab",
            transition: isDragging.current
              ? "none"
              : "transform 0.12s ease-out",
            touchAction: "none",
          }}
          className="draggable-stamp-wrapper"
        >
          <ContactStamp />
        </div>
      </div>
    </div>
  );
}
