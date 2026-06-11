"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSceneLoaded } from "../../components/SceneContext";
import ContactStamp from "@/app/components/ContactStamp";
import { entries } from "../../lib/entries";
import { useReveal } from "../../hooks/useReveal";

export default function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const entry = entries[slug];
  const { journalOpen } = useSceneLoaded();

  // Track system preference for reduced motion locally
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Handle fallback text values if motion is restricted (skips typing steps)
  const fallbackId = entry ? (entry.id ?? "") : "";
  const fallbackAnomaly = entry ? (entry.anomaly ?? "") : "";

  const revealedId = useReveal(
    fallbackId,
    prefersReducedMotion ? 0 : 2500,
    prefersReducedMotion ? 0 : 55,
  );
  const revealedAnomaly = useReveal(
    fallbackAnomaly,
    prefersReducedMotion ? 0 : 2500,
    prefersReducedMotion ? 0 : 30,
  );

  if (!entry) {
    return (
      <div style={{ color: "#F2EFE9", fontFamily: "monospace" }}>
        Entry not found.{" "}
        <Link href="/" style={{ color: "#E8C99B" }}>
          ← Index
        </Link>
      </div>
    );
  }

  // Choose display strings safely avoiding blinking delays for a11y clients
  const activeId = prefersReducedMotion ? fallbackId : revealedId;
  const activeAnomaly = prefersReducedMotion
    ? fallbackAnomaly
    : revealedAnomaly;

  return (
    <div
      style={{
        display: "flex",
        width: "min(900px, 95vw)",
        minHeight: "min(580px, 80vh)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        opacity: journalOpen ? 1 : 0,
        // Disables layout transition delays if motion is reduced
        transition: prefersReducedMotion ? "none" : "opacity 1s ease 0.3s",
        position: "relative" as const,
        transform: prefersReducedMotion ? "none" : "rotate(-1deg)",
      }}
    >
      {/* LEFT PAGE — nav + title + observation + approach */}
      <div
        className="paper-noise paper-page paper-vignette"
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2.5rem) 5rem",
          borderRight: "none",
          boxShadow: "inset -8px 0 15px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          overflow: "hidden",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "0.75rem",
            color: "#574C40", // Elevated Contrast Pass (5.4:1)
            textDecoration: "underline",
            letterSpacing: "0.05em",
          }}
        >
          ← Index
        </Link>

        <div>
          <h1
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: "700",
              color: "#1A1612",
              margin: 0,
            }}
          >
            {entry.title}
          </h1>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#574C40", // Elevated Contrast Pass
              margin: "0.3rem 0 0",
              letterSpacing: "0.05em",
            }}
          >
            Logged: {entry.logged} · {entry.status}
          </p>
          {entry.id && (
            <div
              style={{
                color: "#C84B31", // Your brand red ink tone
                margin: "0.2rem 0 0",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-handwritten)",
                fontSize: "1.05rem",
              }}
            >
              {activeId.split("").map((char, index) => (
                <span key={index} className="ink-reveal-char">
                  {char}
                </span>
              ))}
            </div>
          )}
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #C8B89A",
            margin: "-0.6rem 0 0",
          }}
        />

        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#6E6052", // Safe Subheading Contrast Pass
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 0.4rem",
            }}
          >
            Observation
          </p>
          <p
            style={{
              fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
              color: "#2A2218",
              lineHeight: "1.75",
              margin: 0,
            }}
          >
            {entry.observation}
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#6E6052", // Safe Subheading Contrast Pass
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 0.4rem",
            }}
          >
            Approach
          </p>
          <p
            style={{
              fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
              color: "#2A2218",
              lineHeight: "1.75",
              margin: 0,
            }}
          >
            {entry.approach}
          </p>
        </div>
      </div>

      {/* spine */}
      <div
        style={{
          width: "6px",
          background: "linear-gradient(to right, #B8A898, #D4C8B8, #B8A898)",
          flexShrink: 0,
        }}
      />

      {/* RIGHT PAGE — findings + anomaly + tech + links */}
      <div
        className="paper-noise paper-page paper-vignette-right"
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2.5rem) 5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
          boxShadow: "inset 8px 0 15px rgba(0,0,0,0.12)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#6E6052", // Safe Subheading Contrast Pass
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 0.4rem",
            }}
          >
            Findings
          </p>
          <p
            style={{
              fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
              color: "#2A2218",
              lineHeight: "1.75",
              margin: 0,
            }}
          >
            {entry.findings}
          </p>
        </div>

        {entry.anomaly && activeAnomaly && (
          <div style={{ marginTop: "0.5rem" }}>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#C84B31", // Red ink tone for anomalies
                lineHeight: "1.75",
                margin: 0,
                fontStyle: "italic",
                fontFamily: "var(--font-handwritten)",
              }}
            >
              {activeAnomaly.split("").map((char, index) => (
                <span key={index} className="ink-reveal-char">
                  {char}
                </span>
              ))}
            </p>
          </div>
        )}
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#6E6052", // Safe Subheading Contrast Pass
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: "0 0 0.6rem",
            }}
          >
            Tech Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {entry.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.75rem",
                  color: "#524633", // Elevated Contrast Pass
                  background: "#E8E0D5",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "2px",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            {entry.github && (
              <a
                href={entry.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.82rem",
                  color: "#524633", // Elevated Contrast Pass
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
                  fontSize: "0.82rem",
                  color: "#524633", // Elevated Contrast Pass
                  textDecoration: "underline",
                  letterSpacing: "0.05em",
                }}
              >
                View on App Store →
              </a>
            )}

            {entry.playStore && (
              <a
                href={entry.playStore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.82rem",
                  color: "#524633", // Elevated Contrast Pass
                  textDecoration: "underline",
                  letterSpacing: "0.05em",
                }}
              >
                View on Play Store →
              </a>
            )}
          </div>
        </div>
      </div>
      <ContactStamp />
    </div>
  );
}
