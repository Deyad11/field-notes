"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LoadingOverlay from "./LoadingOverlay";
function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function SceneContents({ onLoaded }: { onLoaded: () => void }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const intensityRef = useRef(0);
  const loadedRef = useRef(false);
  const timeRef = useRef(0);
  const nextFlickerRef = useRef(randomBetween(30, 90));
  const flickerStateRef = useRef<"idle" | "dip" | "recover">("idle");
  const flickerTimerRef = useRef(0);

  // TODO: replace timer with useProgress() from @react-three/drei once real
  // 3D models (desk, lamp, journal) are added in step 6 — useProgress needs
  // actual asset files to track, placeholder geometry has nothing to load
  useEffect(() => {
    const t = setTimeout(() => {
      loadedRef.current = true;
      onLoaded();
    }, 2000);
    return () => clearTimeout(t);
  }, [onLoaded]);

  useFrame((_, delta) => {
    if (!lightRef.current) return;

    // fade in on load
    if (loadedRef.current && intensityRef.current < 8) {
      intensityRef.current = Math.min(intensityRef.current + delta * 5, 8);
    }

    if (!loadedRef.current || intensityRef.current < 7.9) return;

    // ambient micro-flicker — always on
    const micro =
      1 +
      Math.sin(timeRef.current * 7.3) * 0.012 +
      Math.sin(timeRef.current * 13.7) * 0.008;
    timeRef.current += delta;

    // rare sharp flicker
    nextFlickerRef.current -= delta;
    if (nextFlickerRef.current <= 0 && flickerStateRef.current === "idle") {
      flickerStateRef.current = "dip";
      flickerTimerRef.current = 0;
      nextFlickerRef.current = randomBetween(30, 90);
    }

    let sharpMultiplier = 1;
    if (flickerStateRef.current === "dip") {
      flickerTimerRef.current += delta;
      sharpMultiplier = Math.max(0.3, 1 - flickerTimerRef.current / 0.08);
      if (flickerTimerRef.current >= 0.08) {
        flickerStateRef.current = "recover";
        flickerTimerRef.current = 0;
      }
    } else if (flickerStateRef.current === "recover") {
      flickerTimerRef.current += delta;
      sharpMultiplier = 0.3 + (flickerTimerRef.current / 0.15) * 0.7;
      if (flickerTimerRef.current >= 0.15) {
        flickerStateRef.current = "idle";
        sharpMultiplier = 1;
      }
    }

    lightRef.current.intensity = intensityRef.current * micro * sharpMultiplier;
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

export default function Scene({ onLoaded }: { onLoaded: () => void }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    setLoaded(true);
    onLoaded();
  };

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
          <SceneContents onLoaded={handleLoaded} />
        </Canvas>
      </div>
    </>
  );
}
