"use client";

import { useEffect } from "react";
import { writeProgress } from "../../lib/progress";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Center } from "@react-three/drei";
import Model from "./Model";

export default function Scene3D() {
  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/modelo" });
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <Environment preset="city" />

      {/* Center ayuda a centrar el modelo automáticamente */}
      <Center>
        <Float speed={1.0} rotationIntensity={0.4} floatIntensity={0.25}>
          <Model url="/models/espiral.glb" scale={100.0} />
        </Float>
      </Center>

      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}
