"use client";

import { useEffect } from "react";
import TechTrailBackground from "@/components/tech-trail-background/TechTrailBackground";
import { writeProgress } from "../../lib/progress";

export default function Etapa2Page() {
  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/etapa2" });
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(900px 520px at 14% -8%, rgba(34, 211, 238, 0.16), transparent 64%), radial-gradient(760px 460px at 88% 108%, rgba(99, 102, 241, 0.2), transparent 64%), linear-gradient(180deg, #040b18 0%, #020613 54%, #01030b 100%)",
      }}
    >
      <TechTrailBackground />
    </div>
  );
}
