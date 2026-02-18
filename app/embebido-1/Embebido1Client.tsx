"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import CharacterStepDialog, {
  CharacterDialogStep,
} from "@/components/character-step-dialog/CharacterStepDialog";
import MatrixRainBackground from "@/components/matrix-rain/MatrixRainBackground";
import { SHARED_MATRIX_RAIN_PRESET } from "@/components/matrix-rain/matrixRainPresets";
import MiniSpiralViewer from "@/components/mini-spiral-viewer/MiniSpiralViewer";
import styles from "./embebido1.module.css";
import { writeProgress } from "../../lib/progress";

const TITLE_MS = 5000;
const VIDEO_URL = "/videos/TransicionE1-a-E2.mp4";
const VIDEO_MAX_WIDTH = "1220px";
const VIDEO_MAX_HEIGHT_VIEWPORT = "84dvh";
const VIDEO_MAX_HEIGHT_PIXELS = "780px";

type Embebido1Phase =
  | "title"
  | "dialog"
  | "form-space"
  | "post-form-dialog"
  | "video";

export default function Embebido1Client() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Embebido1Phase>("title");
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoPanelStyle = {
    "--video-panel-max-width": VIDEO_MAX_WIDTH,
    "--video-max-height-vh": VIDEO_MAX_HEIGHT_VIEWPORT,
    "--video-max-height-px": VIDEO_MAX_HEIGHT_PIXELS,
  } as CSSProperties;

  const laiaSteps = useMemo<CharacterDialogStep[]>(
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
        text: "Este diagnóstico determinará el estado actual de tu conocimiento sobre IA; los niveles son básico, intermedio y avanzado.",
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - paso 3",
      },
      {
        text: "Responde con sinceridad. Así el recorrido será útil y aplicable.",
        imgSrc: "/ui/Laia.png",
        imgAlt: "Laia - paso 3",
      },
    ],
    []
  );

  const postFormSteps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Listo. Ya tenemos tu punto de partida.",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - embebido paso post formulario 1",
      },
      {
        text: "Con esto, lo que viene no será genérico: estará alineado a tu realidad.",
        imgSrc: "/ui/Laia.png",
        imgAlt: "Laia - embebido paso post formulario 1",
      },
      {
        text: "Ahora pasamos a explorar posibilidades basándonos en tus resultados.",
        imgSrc: "/ui/Laia_triumphant.png",
        imgAlt: "Laia - embebido paso post formulario 2",
      },
    ],
    []
  );

  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/embebido-1" });
  }, []);

  useEffect(() => {
    if (phase !== "title") return;
    const timerId = window.setTimeout(() => setPhase("dialog"), TITLE_MS);
    return () => window.clearTimeout(timerId);
  }, [phase]);

  function handleLaiaComplete() {
    setPhase("form-space");
  }

  function handleFormContinue() {
    setPhase("post-form-dialog");
  }

  function handlePostFormDialogComplete() {
    setVideoStarted(false);
    setVideoEnded(false);
    setPhase("video");
  }

  function handlePlayVideo() {
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise?.catch) playPromise.catch(() => {});
    setVideoStarted(true);
    setVideoEnded(false);
  }

  function handleVideoEnded() {
    setVideoStarted(false);
    setVideoEnded(true);
  }

  function goToEtapa2() {
    writeProgress({ lastRoute: "/etapa2" });
    router.push("/etapa2");
  }

  return (
    <div className={styles.stage}>
      <MatrixRainBackground
        className={styles.matrixBackground}
        {...SHARED_MATRIX_RAIN_PRESET}
      />

      <div className={styles.miniViewerDock}>
        <MiniSpiralViewer />
      </div>

      <main className={styles.main}>
        {phase === "title" ? (
          <section className={styles.titlePanel}>
            <h1 className={styles.title}>Bienvenido a la etapa 1</h1>
          </section>
        ) : null}

        {phase === "dialog" ? (
          <section className={styles.dialogPanel}>
            <CharacterStepDialog
              steps={laiaSteps}
              size="compact"
              onComplete={handleLaiaComplete}
            />
          </section>
        ) : null}

        {phase === "form-space" ? (
          <section className={styles.formSpacePanel}>
            <div className={styles.formSpaceBox}>Espacio para el formulario</div>
            <button
              type="button"
              className={styles.videoActionBtn}
              onClick={handleFormContinue}
            >
              Continuar
            </button>
          </section>
        ) : null}

        {phase === "post-form-dialog" ? (
          <section className={styles.dialogPanel}>
            <CharacterStepDialog
              steps={postFormSteps}
              size="compact"
              onComplete={handlePostFormDialogComplete}
            />
          </section>
        ) : null}

        {phase === "video" ? (
          <section className={styles.videoPanel} style={videoPanelStyle}>
            <video
              ref={videoRef}
              className={styles.video}
              src={VIDEO_URL}
              playsInline
              controls={false}
              onEnded={handleVideoEnded}
            />

            {!videoStarted && !videoEnded ? (
              <button
                type="button"
                className={styles.videoActionBtn}
                onClick={handlePlayVideo}
              >
                Reproducir video
              </button>
            ) : null}

            {videoEnded ? (
              <button
                type="button"
                className={styles.videoActionBtn}
                onClick={goToEtapa2}
              >
                Continuar
              </button>
            ) : null}
          </section>
        ) : null}
      </main>
    </div>
  );
}
