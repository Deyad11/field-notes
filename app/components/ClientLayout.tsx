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

  return (
    <SceneLoadedContext.Provider value={loaded}>
      <Scene onLoaded={() => setLoaded(true)} />
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
  );
}
