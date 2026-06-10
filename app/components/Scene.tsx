"use client";
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0, background: "#1C1A18" }}
    >
      <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.28} />
        <pointLight position={[0, 3, 1]} intensity={8} color="#E8C99B" />{" "}
        {/* subtle fill so desk surface is readable */}
        <pointLight position={[-1, 1, 2]} intensity={0.4} color="#3A3028" />
        {/* placeholder desk */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial color="#6B4F3A" />
        </mesh>
        {/* placeholder lamp */}
        <mesh position={[1, 0.5, -0.5]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#5C4F42"
            emissive="#E8C99B"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
