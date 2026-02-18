"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CharacterStepDialog, {
  CharacterDialogStep,
} from "@/components/character-step-dialog/CharacterStepDialog";
import MatrixRainBackground from "@/components/matrix-rain/MatrixRainBackground";
import { SHARED_MATRIX_RAIN_PRESET } from "@/components/matrix-rain/matrixRainPresets";
import styles from "./modelo.module.css";
import Scene3D from "./scene3d";
import { writeProgress } from "../../lib/progress";

const VIDEO_URL = "/videos/intro-modelo.mp4";
type ModeloPhase = "video" | "dialog" | "model";

export default function ModeloClient() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [phase, setPhase] = useState<ModeloPhase>("video");

  // ✅ Nuevo: control de reproducción manual
  const [hasStartedVideo, setHasStartedVideo] = useState(false);

  // ✅ "Siguiente" solo al terminar (o al saltar)
  const [videoEnded, setVideoEnded] = useState(false);

  const modelSteps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Bienvenido, este es el modelo de proceso que seguiremos juntos para aumentar tus conocimientos sobre inteligencia artificial generativa.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - modelo paso 1",
      },
      {
        text: "Este modelo de proceso guía la apropiación pedagógica de la IA generativa en la docencia a través de seis etapas conectadas en forma de espiral.",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo paso 2",
      },
      {
        text: "La espiral representa un recorrido progresivo e iterativo: se avanza etapa por etapa, se implementa en el aula, se evalúa lo que ocurrió y se mejora con base en evidencia.",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo paso 3",
      },
      {
        text: "Así, cada nueva vuelta a la espiral permite refinar decisiones, materiales y estrategias.",
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - modelo paso 4",
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
        text: "En este punto seguro te preguntas ¿por qué una espiral?",
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "Una espiral no representa una lista de pasos aislados. Representa un ciclo de mejora:", 
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "1. Se parte del contexto real y una necesidad concreta. ", 
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "2. Se diseñan decisiones pedagógicas con propósito. ", 
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "3. Se implementa con acompañamiento y cuidado. ", 
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "4. Se evalúa el impacto y se ajusta. ", 
        imgSrc: "/ui/Laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "El valor del modelo está en que permite avanzar con estructura, evitando improvisación, y fortaleciendo la práctica docente con cada iteración.", 
        imgSrc: "/ui/Laia_triumphant.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
    ],
    []
  );

  const [isPostDialogComplete, setIsPostDialogComplete] = useState(false);

  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/modelo" });

    // ✅ Asegura que arranque pausado y con audio disponible
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    }
  }, []);

  async function playVideo() {
    const v = videoRef.current;
    if (!v) return;

    try {
      // ✅ reproducción tras interacción: audio permitido
      v.muted = false;
      v.volume = 1;
      setHasStartedVideo(true);
      await v.play();
    } catch {
      // Si fallara, normalmente es por políticas extrañas o codec.
      // Pero al ser interacción directa, debería funcionar.
    }
  }

  function handleVideoEnded() {
    setVideoEnded(true);
  }

  function skipVideo() {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setVideoEnded(true);
    setHasStartedVideo(true);
  }

  function goNextFromVideo() {
    setPhase("dialog");
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
        {...SHARED_MATRIX_RAIN_PRESET}
      />

      <header className={styles.topBar}>
        <Link className={styles.back} href="/">
          &larr; Volver
        </Link>
        <div className={styles.title}>Modelo</div>
      </header>

      <main className={styles.center}>
        {phase === "video" ? (
          <div className={styles.videoFull}>
            <video
              ref={videoRef}
              className={styles.videoFullMedia}
              src={VIDEO_URL}
              playsInline
              controls={false}   // ✅ sin controles
              preload="auto"
              onEnded={handleVideoEnded}
            />

            <div className={styles.videoActions}>
              {/* ✅ Botón principal: Reproducir */}
              {!hasStartedVideo ? (
                <button type="button" className={styles.nextBtn} onClick={playVideo}>
                  Reproducir <span className={styles.arrow}>▶</span>
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={goNextFromVideo}
                  disabled={!videoEnded}
                  aria-disabled={!videoEnded}
                >
                  Siguiente <span className={styles.arrow}>→</span>
                </button>
              )}

              {/* Opcional: Saltar */}
              <button
                type="button"
                className={styles.skipBtn}
                onClick={skipVideo}
                disabled={videoEnded}
              >
                Saltar video
              </button>
            </div>

            {!hasStartedVideo ? (
              <p className={styles.videoHint}>Pulsa “Reproducir” para iniciar con audio.</p>
            ) : !videoEnded ? (
              <p className={styles.videoHint}>Reproduciendo… al finalizar se habilitará “Siguiente”.</p>
            ) : (
              <p className={styles.videoHintDone}>Video finalizado. Puedes continuar.</p>
            )}
          </div>
        ) : phase === "dialog" ? (
          <div className={styles.dialogFlow}>
            <CharacterStepDialog
              steps={modelSteps}
              onComplete={() => handleDialogComplete()}
              size="compact"
              className={styles.dialog}
            />
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.viewer}>
              <Scene3D />
            </div>

            <p className={styles.hint}>Arrastra para rotar | Scroll para hacer zoom</p>

            <div
              className={`${styles.dialogArea} ${isPostDialogComplete ? styles.dialogAreaWithAction : ""}`}
            >
              <CharacterStepDialog
                steps={postModelSteps}
                onComplete={() => handlePostDialogComplete()}
                size="compact"
                className={styles.dialog}
              />

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
          </div>
        )}
      </main>
    </div>
  );
}
