"use client";
import { useSceneLoaded } from "./components/SceneContext";
// PLANNED — Step 6 addition (after real 3D models):
// Lamp lights up → desk visible for ~2s → small text prompt appears: "open the journal..."
// User clicks or presses any key → journal panels fade/slide in
// Currently journal appears automatically after lamp loads (no user action)
// To implement: add a second state `journalOpen` after `loaded`, wire prompt UI,
// then gate the journal opacity on `journalOpen` instead of `loaded`
export default function Home() {
  const loaded = useSceneLoaded();
  return (
    <div
      style={{
        display: "flex",
        gap: "0",
        width: "min(900px, 95vw)",
        minHeight: "580px",
        boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1s ease 0.3s",
      }}
    >
      {/* LEFT PAGE — About */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "3rem 2.5rem",
          borderRight: "2px solid #C8B89A",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              color: "#1A1612",
              margin: 0,
            }}
          >
            Deepanshu Yadav
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#5C4F3A",
              margin: "0.3rem 0 0",
              letterSpacing: "0.05em",
            }}
          >
            Full-Stack Developer
          </p>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #C8B89A",
            margin: "0.5rem 0",
          }}
        />

        <p
          style={{
            fontSize: "0.88rem",
            color: "#2A2218",
            lineHeight: "1.75",
            margin: 0,
          }}
        >
          I tend to notice patterns before I understand them — in code, in
          people, in stories.
        </p>

        <div
          style={{ fontSize: "0.82rem", color: "#5C4F3A", lineHeight: "1.6" }}
        >
          <p style={{ margin: 0 }}>B.Tech CSE — NorthCap University</p>
          <p style={{ margin: 0 }}>Full-Stack Specialization</p>
        </div>

        <p
          style={{
            fontSize: "0.88rem",
            color: "#2A2218",
            lineHeight: "1.75",
            margin: 0,
          }}
        >
          I read too many web novels. Some of them, I think, read back.
        </p>
      </div>

      {/* RIGHT PAGE — Index */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color: "#5C4F3A",
            letterSpacing: "0.2em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Index
        </h2>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          {/* Kizuna */}
          <div style={{ cursor: "pointer" }}>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#1A1612",
                margin: 0,
              }}
            >
              Kizuna
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#8A7A6A",
                margin: "0.2rem 0 0",
                letterSpacing: "0.05em",
              }}
            >
              Logged: May 2026 · Resolved
            </p>
          </div>

          {/* Inventory Management System */}
          <div style={{ cursor: "pointer" }}>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#1A1612",
                margin: 0,
              }}
            >
              Inventory Management System
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#8A7A6A",
                margin: "0.2rem 0 0",
                letterSpacing: "0.05em",
              }}
            >
              Logged: Apr 2024 · Resolved
            </p>
          </div>

          {/* Vobble */}
          <div style={{ cursor: "pointer" }}>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#1A1612",
                margin: 0,
              }}
            >
              Vobble
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#8A7A6A",
                margin: "0.2rem 0 0",
                letterSpacing: "0.05em",
              }}
            >
              Logged: Feb 2026 · Resolved
            </p>
          </div>

          {/* Futloo AI */}
          <div style={{ cursor: "pointer" }}>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#1A1612",
                margin: 0,
              }}
            >
              Futloo AI
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#8A7A6A",
                margin: "0.2rem 0 0",
                letterSpacing: "0.05em",
              }}
            >
              Logged: Apr 2025 · Ongoing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
