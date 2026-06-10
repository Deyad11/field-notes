"use client";
import { useEffect, useState } from "react";

export default function LoadingOverlay({ loaded }: { loaded: boolean }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0D0D0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: loaded ? 0 : 1,
        transition: "opacity 1.2s ease",
        pointerEvents: "none",
      }}
    >
      <p
        style={{
          color: "#E8C99B",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          letterSpacing: "0.15em",
          opacity: 0.7,
        }}
      >
        lighting the lamp...
      </p>
    </div>
  );
}
