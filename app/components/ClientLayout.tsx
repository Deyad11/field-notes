"use client";
import { useState } from "react";
import Scene from "./Scene";
import { SceneLoadedContext } from "./SceneContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  return (
    <SceneLoadedContext.Provider
      value={{ loaded, journalOpen, setJournalOpen }}
    >
      <Scene onLoaded={() => setLoaded(true)} />

      {/* open the journal prompt */}
      {loaded && !journalOpen && (
        <div
          onClick={() => setJournalOpen(true)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "3rem",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#E8C99B",
              fontFamily: "monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              opacity: 0.7,
              animation: "pulsePrompt 2.5s ease-in-out infinite",
            }}
          >
            open the journal...
          </p>
        </div>
      )}
      {journalOpen && (
        <div
          onClick={() => setJournalOpen(false)}
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            zIndex: 11,
            color: "#8A7A6A",
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          ✕ close
        </div>
      )}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          pointerEvents: journalOpen ? "auto" : "none",
        }}
      >
        {children}
      </main>
    </SceneLoadedContext.Provider>
  );
}
