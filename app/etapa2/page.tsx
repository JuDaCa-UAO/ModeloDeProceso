"use client";

import { useEffect } from "react";
import { writeProgress } from "../../lib/progress";

export default function Etapa2Page() {
  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/etapa2" });
  }, []);

  return <div style={{ minHeight: "100dvh" }} />;
}

