"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LoadingOverlay from "./LoadingOverlay";

function SceneContents({ loaded }: { loaded: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const intensityRef = useRef(0);

  useFrame((_, delta) => {
    if (loaded && intensityRef.current < 8) {
      intensityRef.current = Math.min(intensityRef.current + delta * 5, 8);
      if (lightRef.current) {
        lightRef.current.intensity = intensityRef.current;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight
        ref={lightRef}
        position={[0, 3, 1]}
        intensity={0}
        color="#E8C99B"
      />

      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#6B4F3A" />
      </mesh>

      <mesh position={[1, 0.5, -0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#1A1A1A"
          emissive="#E8C99B"
          emissiveIntensity={0.6}
        />
      </mesh>
    </>
  );
}

export default function Scene() {
  const [loaded, setLoaded] = useState(false);

  // TODO: replace timer with useProgress() from @react-three/drei once real
  // 3D models (desk, lamp, journal) are added in step 6 — useProgress needs
  // actual asset files to track, placeholder geometry has nothing to load
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingOverlay loaded={loaded} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#1C1A18",
        }}
      >
        <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
          <SceneContents loaded={loaded} />
        </Canvas>
      </div>
    </>
  );
}
