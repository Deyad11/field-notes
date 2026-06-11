"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LoadingOverlay from "./LoadingOverlay";
import { useSceneLoaded } from "./SceneContext";

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Desk() {
  return (
    <group>
      {/* surface */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.8]} />
        <meshStandardMaterial color="#3D2B1F" roughness={0.9} />
      </mesh>
      {/* legs */}
      {[
        [-1.4, -0.5, -0.7],
        [1.4, -0.5, -0.7],
        [-1.4, -0.5, 0.7],
        [1.4, -0.5, 0.7],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial color="#2A1F14" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function Lamp() {
  return (
    <group position={[1.1, 0.08, -0.5]}>
      {/* base */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.06, 16]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* vertical stem */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* angled arm */}
      <mesh position={[-0.15, 0.72, 0]} rotation={[0, 0, Math.PI / 5]}>
        <cylinderGeometry args={[0.018, 0.018, 0.45, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* shade */}
      <mesh position={[-0.28, 0.88, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.18, 0.22, 16, 1, true]} />
        <meshStandardMaterial
          color="#1C1C1C"
          roughness={0.8}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ClosedJournal({ onClick }: { onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        0.06 + Math.sin(clock.elapsedTime * 1.2) * 0.004;
    }
  });

  return (
    <group>
      {/* cover */}
      <mesh
        ref={meshRef}
        position={[0, 0.06, 0.1]}
        onClick={onClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[0.8, 0.06, 1.1]} />
        <meshStandardMaterial color="#2A1F1A" roughness={0.95} />
      </mesh>
      {/* spine */}
      <mesh position={[-0.38, 0.06, 0.1]}>
        <boxGeometry args={[0.02, 0.07, 1.1]} />
        <meshStandardMaterial color="#1A1410" roughness={0.95} />
      </mesh>
    </group>
  );
}

function SceneContents({
  onLoaded,
  onJournalClick,
}: {
  onLoaded: () => void;
  onJournalClick: () => void;
}) {
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

    if (loadedRef.current && intensityRef.current < 8) {
      intensityRef.current = Math.min(intensityRef.current + delta * 5, 8);
    }

    if (!loadedRef.current || intensityRef.current < 7.9) return;

    const micro =
      1 +
      Math.sin(timeRef.current * 7.3) * 0.012 +
      Math.sin(timeRef.current * 13.7) * 0.008;
    timeRef.current += delta;

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
      <ambientLight intensity={0.12} />
      <pointLight
        ref={lightRef}
        position={[0.82, 1.1, -0.5]}
        intensity={0}
        color="#E8C99B"
        distance={4}
        decay={2}
      />
      <Desk />
      <Lamp />
      <ClosedJournal onClick={onJournalClick} />
    </>
  );
}

export default function Scene({ onLoaded }: { onLoaded: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const { setJournalOpen } = useSceneLoaded();

  const handleLoaded = () => {
    setLoaded(true);
    onLoaded();
  };

  const handleJournalClick = () => {
    setJournalOpen(true);
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
        <Canvas
          camera={{ position: [0, 3.5, 4], fov: 45 }}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
          <SceneContents
            onLoaded={handleLoaded}
            onJournalClick={handleJournalClick}
          />
        </Canvas>
      </div>
    </>
  );
}
