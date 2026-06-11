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
  inkMid: "#524633", // Elevated Contrast Pass for subtext and tech tags (5.2:1)
  inkLight: "#574C40", // Elevated Contrast Pass for metadata labels/links (5.4:1)
  inkSubhead: "#6E6052", // Safe, rich tone for uppercase section headers
  inkFaint: "#C8B89A",
  inkFaintest: "#E0D8CC",
  accent: "#B33622",
  tagBg: "#E8E0D5",
  spiral: "#9A8A7A",
  bg: "#1C1A18",
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
    // FIXED: Tightened the parent gap from 1.3rem to 0.85rem
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
            margin: "0.2rem 0 0", // Reduced top margin
            letterSpacing: "0.05em",
          }}
        >
          Full-Stack & Mobile Developer
        </p>
      </div>

      <Divider />

      <p
        style={{
          fontSize: "0.88rem",
          color: "#2A2218",
          lineHeight: "1.6", // Marginally tightened line height from 1.8
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
          {" "}
          {/* Tightened gap */}
          Futloo AI
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
          Full-Stack Specialization · CGPA 9.25 · 2026
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {" "}
        {/* Tightened gap */}
        <a
          href="https://www.linkedin.com/in/deepanshu-yadav-b240a7127/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.78rem",
            color: C.inkLight, // Compliant light ink color
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
            color: C.inkLight, // Compliant light ink color
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
          margin: "0.4rem 0 0", // Fixed: Cut top margin down from 1rem to 0.4rem
          fontStyle: "italic",
        }}
      >
        Last edited at a time I don&apos;t remember.
      </p>
    </div>
  );
}

function IndexPage({ onOpenEntry }: { onOpenEntry: (slug: string) => void }) {
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
          key="vobble"
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
          <p className="entry-title">Vobble</p>
          <p className="entry-date">Logged: Feb – Apr 2026 · Resolved</p>
        </button>

        <button
          key="futloo-ai"
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
          <p className="entry-title">Futloo AI</p>
          <p className="entry-date">Logged: Apr – Sep 2025 · Resolved</p>
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
          key="kizuna"
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
          <p className="entry-title">Kizuna</p>
          <p className="entry-date">Logged: May 2026 · Resolved</p>
        </button>

        <button
          key="inventory-management"
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
          <p className="entry-title">Inventory Management System</p>
          <p className="entry-date">Logged: Apr 2024 · Resolved</p>
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
              color: C.accent, // Brand ink red
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
  revealedAnomaly: string;
}

function EntryRightPage({ slug, revealedAnomaly }: EntryRightPageProps) {
  const entry = entries[slug];
  if (!entry) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
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
              color: C.accent, // Using theme token (set C.accent to "#B33622" in tokens for perfect contrast)
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
                {/* Re-inject clean spacing boundaries between words natively */}
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
        <Label>Tech Stack</Label>
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
            App Store →
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
            Play Store →
          </a>
        )}
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

  // Synchronize reduced motion tracker state safely on component layout load
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionActive(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) =>
      setReducedMotionActive(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Safely grab selected active data values to hand down to lifted hooks
  const selectedEntry = activeSlug ? entries[activeSlug] : null;

  // Lifted Hooks: Bypasses motion delays automatically if user requests reduced motion
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
    navigate(2, "forward");
  }

  function backToIndex() {
    navigate(1, "back");
  }

  const canGoBack = pageIndex > 0;
  const canGoForward = currentPage === "about" || currentPage === "entry-left";

  const slideOut = direction === "forward" ? "-60px" : "60px";
  const slideIn = direction === "forward" ? "60px" : "-60px";

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
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              fontSize: "0.62rem",
              color: C.inkLight,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              zIndex: 6,
            }}
          >
            {pageIndex + 1} / {totalPages}
          </span>
        </div>

        {/* ── TAP ZONE — PREVIOUS ── */}
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
              gap: "0.3rem",
            }}
            aria-label="Previous page"
          >
            <span
              style={{
                fontSize: "0.6rem",
                color: C.inkLight,
                letterSpacing: "0.12em",
                fontFamily: "monospace",
                opacity: 0.6,
              }}
            >
              ↑ prev
            </span>
          </button>
        )}

        {/* ── PAGE CONTENT ── */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: `${canGoBack ? "72px" : "1.5rem"} 1.6rem ${canGoForward ? "80px" : "4rem"}`,
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
            {currentPage === "index" && <IndexPage onOpenEntry={openEntry} />}
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
                revealedAnomaly={revealedAnomaly}
              />
            )}
          </div>
        </div>

        {/* ── TAP ZONE — NEXT ── */}
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
              paddingBottom: "0.9rem",
              gap: "0.3rem",
            }}
            aria-label="Next page"
          >
            <span
              style={{
                fontSize: "0.6rem",
                color: C.inkLight,
                letterSpacing: "0.12em",
                fontFamily: "monospace",
                opacity: 0.6,
              }}
            >
              next ↓
            </span>
          </button>
        )}

        {/* ── CONTACT STAMP ── */}
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: `max(1rem, calc((100vw - min(440px, 100vw)) / 2 + 1rem))`,
            zIndex: 30,
          }}
        >
          <ContactStamp />
        </div>
      </div>
    </div>
  );
}
