"use client";
import { useState, useEffect } from "react";
import Scene from "./Scene";
import { SceneLoadedContext } from "./SceneContext";
import MobileJournal from "./MobileJournal";
import { useMobile } from "../hooks/useMobile";

function useReducedOrLowEnd(): boolean | null {
  const [shouldFallback, setShouldFallback] = useState<boolean | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const lowMemory =
      typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    const lowCPU =
      typeof nav.hardwareConcurrency === "number" &&
      nav.hardwareConcurrency <= 2;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldFallback(reducedMotion || lowMemory || lowCPU);
  }, []);

  return shouldFallback;
}

function StaticFallback({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/desk-fallback.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <SceneLoadedContext.Provider
        value={{
          loaded: true,
          journalOpen: true,
          setJournalOpen: () => {},
        }}
      >
        <main
          style={{
            position: "relative",
            zIndex: 10,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {children}
        </main>
      </SceneLoadedContext.Provider>
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const isMobile = useMobile();
  const shouldFallback = useReducedOrLowEnd();

  if (isMobile === null || shouldFallback === null) return null;

  if (isMobile) return <MobileJournal />;

  if (shouldFallback) return <StaticFallback>{children}</StaticFallback>;

  return (
    <SceneLoadedContext.Provider
      value={{ loaded, journalOpen, setJournalOpen }}
    >
      <Scene onLoaded={() => setLoaded(true)} />

      {loaded && !journalOpen && (
        <div
          onClick={() => setJournalOpen(true)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "3rem",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          {/* Positioning copy — name, title, tagline.
              Sits on the closed journal "cover" above the prompt,
              away from the lamp's light pool. */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                color: "#C9BCA8",
                fontFamily: "monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                margin: 0,
                opacity: 0.85,
              }}
            >
              Deepanshu Yadav — Full-Stack &amp; Mobile Developer
            </p>
            <p
              style={{
                color: "#A89C8A",
                fontFamily: "Crimson Pro, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "1rem",
                letterSpacing: "0.015em",
                lineHeight: 1.5,
                margin: "0.6rem 0 0",
              }}
            >
              A working log of things built, broken, and occasionally
              unexplained.
            </p>
          </div>

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
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            cursor: "pointer",
            opacity: 0.7,
            animation: "pulsePrompt 2.5s ease-in-out infinite",
          }}
        >
          close the journal...
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
