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
        text: "Hola, soy Laia. Bienvenido a la etapa 1. Aqui vamos a empezar con una vision general.",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - paso 1",
      },
      {
        text: "En esta etapa vas a entender como se estructura el proceso y que vas a lograr al final.",
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - paso 2",
      },
      {
        text: "Cuando estes listo, pasaremos al contenido embebido para continuar la experiencia.",
        imgSrc: "/ui/Laia_triumphant.png",
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
