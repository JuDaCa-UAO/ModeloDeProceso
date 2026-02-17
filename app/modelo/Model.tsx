"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

type ModelProps = {
  url: string;
};

export default function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);

  const tunedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((node: any) => {
      if (!node?.isMesh || !node.material) return;

      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];

      materials.forEach((mat: any) => {
        mat.toneMapped = false;
        if (typeof mat.envMapIntensity === "number") mat.envMapIntensity = 0;
      });
    });

    return cloned;
  }, [scene]);

  return <primitive object={tunedScene} />;
}

useGLTF.preload("/models/espiral.glb");
