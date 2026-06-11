"use client";
import { use } from "react";
import Link from "next/link";
import { useSceneLoaded } from "../../components/SceneContext";
import ContactStamp from "@/app/components/ContactStamp";
import { entries } from "../../lib/entries";

export default function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const entry = entries[slug];
  const { journalOpen } = useSceneLoaded();

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

  return (
    <div
      style={{
        display: "flex",
        width: "min(900px, 95vw)",
        height: "min(580px, 80vh)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        opacity: journalOpen ? 1 : 0,
        transition: "opacity 1s ease 0.3s",
        position: "relative" as const,
      }}
    >
      {/* LEFT PAGE — nav + title + observation + approach */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2.5rem)",
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
            color: "#8A7A6A",
            textDecoration: "none",
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
              color: "#8A7A6A",
              margin: "0.3rem 0 0",
              letterSpacing: "0.05em",
            }}
          >
            Logged: {entry.logged} · {entry.status}
          </p>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #C8B89A",
            margin: "0",
          }}
        />

        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#8A7A6A",
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
              color: "#8A7A6A",
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
      {/* RIGHT PAGE — findings + anomaly + tech + github */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          overflow: "hidden",
          boxShadow: "inset 8px 0 15px rgba(0,0,0,0.12)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#8A7A6A",
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

        {entry.anomaly && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "#5C4F3A",
              lineHeight: "1.75",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {entry.anomaly}
          </p>
        )}

        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: "700",
              color: "#8A7A6A",
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
                  color: "#5C4F3A",
                  background: "#E8E0D5",
                  padding: "0.2rem 0.6rem",
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
                color: "#5C4F3A",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
      <ContactStamp />
    </div>
  );
}
