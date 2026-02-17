"use client";

import { useEffect, useRef } from "react";
import { writeProgress } from "../../lib/progress";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import Model from "./Model";

const initialDistance = 35;

function RotatingSpiral() {
  const spinRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (!spinRef.current) return;
    spinRef.current.rotation.y += delta * 0.55;
  });

  return (
    <group ref={spinRef}>
      <Center>
        <Model url="/models/espiral.glb" />
      </Center>
    </group>
  );
}

function LockedOrbitControls() {
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom
      enableRotate
      target={[0, 0, 0]}
      minDistance={20}
      maxDistance={50}
    />
  );
}

export default function Scene3D() {
  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/modelo" });
  }, []);

  return (
    <Canvas flat camera={{ position: [0, 0, initialDistance], fov: 42 }}>
      <ambientLight intensity={1.05} color="#ffffff" />
      <directionalLight position={[4, 5, 3]} intensity={0.55} color="#ffffff" />
      <directionalLight
        position={[-3, -2, -4]}
        intensity={0.25}
        color="#ffffff"
      />

      <LockedOrbitControls />

      <RotatingSpiral />
    </Canvas>
  );
}
