"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CharacterStepDialog, {
  CharacterDialogStep,
} from "@/components/character-step-dialog/CharacterStepDialog";
import MatrixRainBackground from "@/components/matrix-rain/MatrixRainBackground";
import styles from "./modelo.module.css";
import Scene3D from "./scene3d";
import { writeProgress } from "../../lib/progress";

const VIDEO_URL = "/videos/intro-modelo.mp4";
const EXIT_MS = 290;
type ModeloPhase = "video" | "dialog" | "model";

export default function ModeloClient() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [phase, setPhase] = useState<ModeloPhase>("video");
  const [videoState, setVideoState] = useState<"show" | "exit">("show");
  const [isPostDialogComplete, setIsPostDialogComplete] = useState(false);

  const modelSteps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Bienvenido, este es el modelo de proceso que seguiremos juntos para aumentar tus conocimientos sobre inteligencia artificial generativa.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - modelo paso 1",
      },
      {
        text: "Este modelo de proceso guía la apropiación pedagógica de la IA generativa en la docencia a través de seis etapas conectadas en forma de espiral. ",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo paso 2",
      },
      {
        text: "La espiral representa un recorrido progresivo e iterativo: se avanza etapa por etapa, se implementa en el aula, se evalúa lo que ocurrió y se mejora con base en evidencia.",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo paso 2",
      },
      {
        text: "Así, cada nueva a vuelta a la espiral permite refinar decisiones, materiales y estrategias.",
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - modelo paso 2",
      },
    ],
    []
  );
  const postModelSteps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Esta es la espiral que iremos recorriendo juntos.",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 1",
      },
      {
        text: "Este proceso no es lineal, como te dije, es iterativo, asi que puedes comenzar a diseñar, crear, aprender y transmitir desde la etapa que desees.",
        imgSrc: "/ui/Laia_triumphant.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
    ],
    []
  );

  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/modelo" });
  }, []);

  function finishVideo() {
    if (videoState === "exit") return;

    setVideoState("exit");

    window.setTimeout(() => {
      setPhase("dialog");
    }, EXIT_MS);
  }

  function handleDialogComplete() {
    setIsPostDialogComplete(false);
    setPhase("model");
  }

  function handlePostDialogComplete() {
    setIsPostDialogComplete(true);
  }

  function goToEmbebido1() {
    writeProgress({ lastRoute: "/embebido-1" });
    router.push("/embebido-1");
  }

  return (
    <div className={styles.stage}>
      <MatrixRainBackground
        className={styles.matrixBackground}
        charSize={17}
        baseSpeed={0.88}
        glowRadius={180}
      />

      <header className={styles.topBar}>
        <Link className={styles.back} href="/">
          &larr; Volver
        </Link>
        <div className={styles.title}>Modelo</div>
      </header>

      <main className={styles.center}>
        {phase === "video" ? (
          <div
            className={`${styles.videoWrap} ${
              videoState === "exit" ? styles.videoExitRight : ""
            }`}
            style={{ ["--exit-ms" as any]: `${EXIT_MS}ms` }}
          >
            <video
              ref={videoRef}
              className={styles.video}
              src={VIDEO_URL}
              controls
              playsInline
              onEnded={finishVideo}
            />

            <button
              type="button"
              className={styles.skipBtn}
              onClick={finishVideo}
              disabled={videoState === "exit"}
            >
              Saltar video
            </button>
          </div>
        ) : phase === "dialog" ? (
          <div className={styles.dialogFlow}>
            <CharacterStepDialog
              steps={modelSteps}
              onComplete={handleDialogComplete}
              size="compact"
              className={styles.dialog}
            />
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.viewer}>
              <Scene3D />
            </div>

            <p className={styles.hint}>
              Arrastra para rotar | Scroll para hacer zoom 
            </p>

            <div className={styles.dialogArea}>
              <CharacterStepDialog
                steps={postModelSteps}
                onComplete={handlePostDialogComplete}
                size="compact"
                className={styles.dialog}
              />
            </div>

            {isPostDialogComplete ? (
              <button
                type="button"
                className={styles.continueBtn}
                onClick={goToEmbebido1}
              >
                Continuar
              </button>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
