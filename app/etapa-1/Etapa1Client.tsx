"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import CharacterStepDialog, {
  CharacterDialogStep,
} from "@/components/character-step-dialog/CharacterStepDialog";
import styles from "./etapa1.module.css";
import { writeProgress } from "../../lib/progress";

export default function Etapa1Client() {
  const router = useRouter();

  const steps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Antes de ver herramientas, necesito entender tu punto de partida.",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - paso 1",
      },
      {
        text: "Este autodiagnóstico no te evalúa: me ayuda a conocer tu contexto, qué quieres mejorar y qué condiciones tienes.",
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - paso 2",
      },
      {
        text: "Responde con sinceridad. Así el recorrido será útil y aplicable.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - paso 3",
      },
    ],
    []
  );

  function handleDialogComplete() {
    writeProgress({ lastRoute: "/embebido-1" });
    router.push("/embebido-1");
  }

  return (
    <div className={styles.stage}>
      <CharacterStepDialog
        steps={steps}
        className={styles.dialog}
        onComplete={handleDialogComplete}
      />
    </div>
  );
}

