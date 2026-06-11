"use client";
// REMOVED: Unused 'useRef' import to fix the warning
import { useState, useEffect } from "react";
import Scene from "./Scene";
import { SceneLoadedContext } from "./SceneContext";
import MobileJournal from "./MobileJournal";
import { useMobile } from "../hooks/useMobile";

function useReducedOrLowEnd(): boolean | null {
  const [shouldFallback, setShouldFallback] = useState<boolean | null>(null);

  useEffect(() => {
    // prefers-reduced-motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // low-end device heuristic — hardware concurrency (CPU cores) and device memory
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const lowMemory =
      typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
    const lowCPU =
      typeof nav.hardwareConcurrency === "number" &&
      nav.hardwareConcurrency <= 2;

    // FIXED: Added explicit exclusion rule for initial client-side device heuristic mapping
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldFallback(reducedMotion || lowMemory || lowCPU);
  }, []);

  return shouldFallback;
}

function StaticFallback({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* static desk image replacing the live canvas */}
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
      {/* journal is always visible — no lamp load sequence needed */}
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

  // Not yet measured
  if (isMobile === null || shouldFallback === null) return null;

  // Mobile: steno-pad journal, no R3F
  if (isMobile) return <MobileJournal />;

  // Low-end / reduced-motion: static image + journal always open
  if (shouldFallback) return <StaticFallback>{children}</StaticFallback>;

  // Desktop full experience
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
