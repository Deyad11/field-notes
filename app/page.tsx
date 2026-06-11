"use client";
import ContactStamp from "./components/ContactStamp";
import { useSceneLoaded } from "./components/SceneContext";
import Link from "next/link";

// PLANNED — Step 6 addition (after real 3D models):
// Lamp lights up → desk visible for ~2s → small text prompt appears: "open the journal..."
// User clicks or presses any key → journal panels fade/slide in
// Currently journal appears automatically after lamp loads (no user action)
// To implement: add a second state `journalOpen` after `loaded`, wire prompt UI,
// then gate the journal opacity on `journalOpen` instead of `loaded`

export default function Home() {
  const { journalOpen } = useSceneLoaded();

  return (
    <div
      style={{
        display: "flex",
        gap: "0",
        width: "min(900px, 95vw)",
        height: "min(580px, 80vh)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)", // Swapped the inset shadow to an outer one for the main container
        opacity: journalOpen ? 1 : 0,
        transition: "opacity 1s ease 0.3s",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      {/* LEFT PAGE — About */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "3rem 2.5rem",
          boxShadow: "inset -8px 0 15px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          borderRadius: "4px 0 0 4px",
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
            Full-Stack & Mobile Developer
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
          style={{ fontSize: "0.82rem", color: "#5C4F3A", lineHeight: "1.7" }}
        >
          <p style={{ margin: 0, fontWeight: "600", color: "#1A1612" }}>
            Vobble
          </p>
          <p style={{ margin: 0 }}>React Native Developer · Feb – Apr 2026</p>
          <p
            style={{
              margin: "0.6rem 0 0",
              fontWeight: "600",
              color: "#1A1612",
            }}
          >
            Futloo
          </p>
          <p style={{ margin: 0 }}>Android Developer · Apr – Sep 2025</p>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #C8B89A",
            margin: "0",
          }}
        />

        <div
          style={{ fontSize: "0.78rem", color: "#5C4F3A", lineHeight: "1.7" }}
        >
          <p style={{ margin: "0 0 0.3rem" }}>
            React Native · React.js · Next.js · Node.js
          </p>
          <p style={{ margin: 0 }}>Java · Spring Boot · MySQL · Supabase</p>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #C8B89A",
            margin: "0",
          }}
        />

        <div
          style={{ fontSize: "0.82rem", color: "#5C4F3A", lineHeight: "1.6" }}
        >
          <p style={{ margin: 0 }}>B.Tech CSE — NorthCap University</p>
          <p style={{ margin: 0 }}>
            Full-Stack Specialization · CGPA 9.25 · 2026
          </p>
        </div>

        <p
          style={{
            fontSize: "0.82rem",
            color: "#8A7A6A",
            lineHeight: "1.75",
            margin: "auto 0 0",
            fontStyle: "italic",
          }}
        >
          Last edited at a time I don't remember.
        </p>
      </div>

      {/* SPINE */}
      <div
        style={{
          width: "6px",
          background: "linear-gradient(to right, #B8A898, #D4C8B8, #B8A898)",
          flexShrink: 0,
          zIndex: 10,
        }}
      />

      {/* RIGHT PAGE — Index */}
      <div
        style={{
          flex: 1,
          background: "#F2EFE9",
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          boxShadow: "inset 8px 0 15px rgba(0,0,0,0.08)",
          borderRadius: "0 4px 4px 0",
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
          <Link href="/entry/kizuna" className="index-link">
            <p className="entry-title">Kizuna</p>
            <p className="entry-date">Logged: May 2026 · Resolved</p>
          </Link>

          <Link href="/entry/inventory-management" className="index-link">
            <p className="entry-title">Inventory Management System</p>
            <p className="entry-date">Logged: Apr 2024 · Resolved</p>
          </Link>

          <Link href="/entry/vobble" className="index-link">
            <p className="entry-title">Vobble</p>
            <p className="entry-date">Logged: Feb 2026 · Resolved</p>
          </Link>

          <Link href="/entry/futloo-ai" className="index-link">
            <p className="entry-title">Futloo</p>
            <p className="entry-date">Logged: Apr 2025 · Ongoing</p>
          </Link>
        </div>
      </div>

      <ContactStamp />
    </div>
  );
}
