"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 2, 1]} intensity={1} color="#E8C99B" />
        {/* placeholder desk */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        {/* placeholder lamp */}
        <mesh position={[1, 0.5, -0.5]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </Canvas>
    </div>
  );
}
