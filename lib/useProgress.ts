"use client";

import { useEffect, useState } from "react";
import { ProgressState, readProgress, writeProgress, clearProgress } from "./progress";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => ({
    hasStarted: false,
    lastRoute: "/modelo",
    updatedAt: 0,
  }));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setReady(true);
  }, []);

  const set = (patch: Partial<ProgressState>) => {
    writeProgress(patch);
    setProgress(readProgress());
  };

  const reset = () => {
    clearProgress();
    setProgress(readProgress());
  };

  return { progress, set, reset, ready };
}
