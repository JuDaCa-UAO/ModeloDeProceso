"use client";

import { useGLTF } from "@react-three/drei";

export default function Model({
  url,
  scale = 1,
}: {
  url: string;
  scale?: number;
}) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

// Opcional: precarga (mejora la experiencia)
useGLTF.preload("/models/espiral.glb");
