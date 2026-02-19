"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CharacterStepDialog, {
  CharacterDialogStep,
} from "@/components/character-step-dialog/CharacterStepDialog";
import TechTrailBackground from "@/components/tech-trail-background/TechTrailBackground";
import styles from "./modelo.module.css";
import Scene3D from "./scene3d";
import { writeProgress } from "../../lib/progress";

const VIDEO_URL = "/videos/intro-modelo.mp4";
type ModeloPhase = "video" | "dialog" | "model";

export default function ModeloClient() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [phase, setPhase] = useState<ModeloPhase>("video");

  const [hasStartedVideo, setHasStartedVideo] = useState(false);

  const [videoEnded, setVideoEnded] = useState(false);

  const modelSteps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Bienvenido. Este es el modelo de proceso que seguiremos juntos para fortalecer tus conocimientos sobre inteligencia artificial generativa.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - modelo paso 1",
      },
      {
        text: "Este modelo guía la apropiación pedagógica de la IA generativa en la docencia, a través de seis etapas conectadas en forma de espiral.",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - modelo paso 2",
      },
            {
        text: "Seguro te preguntas: ¿por qué una espiral?",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "Una espiral no representa una lista de pasos aislados; representa un ciclo de mejora:",
        imgSrc: "/ui/Laia.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "1. Se parte del contexto real y de una necesidad concreta.",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "2. Se diseñan decisiones pedagógicas con propósito.",
        imgSrc: "/ui/Laia.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "3. Se implementa con acompañamiento y cuidado.",
        imgSrc: "/ui/Laia_explaining_holo.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "4. Se evalúa el impacto y se ajusta.",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
      {
        text: "El valor del modelo está en que te permite avanzar con estructura, evitando la improvisación y fortaleciendo tu práctica docente con cada iteración.",
        imgSrc: "/ui/Laia_triumphant.png",
        imgAlt: "Laia - modelo desbloqueado paso 2",
      },
    ],
    []
  );

  const postModelSteps = useMemo<CharacterDialogStep[]>(
    () => [
      {
        text: "Esta es la espiral que recorreremos juntos.",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 1",
      },
      {
        text: "Conforme avances, podrás ver tu progreso reflejado arriba a la derecha, pues la espiral siempre te acompañará.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - modelo desbloqueado paso 1",
      },
      {
        text: "Por cierto, es posible que esta no sea tu primera iteración. No te preocupes: podrás avanzar al punto que desees (Falta implementar interactividad con Espiral).",
        imgSrc: "/ui/laia_explaining.png",
        imgAlt: "Laia - modelo desbloqueado paso 1",
      },
      {
        text: "Bien, ahora que conoces un poco del modelo, ¿qué tal si vamos directamente a la etapa 1?",
        imgSrc: "/ui/laia_explaining_holo.png",
        imgAlt: "Laia - modelo desbloqueado paso 1",
      },
      {
        text: "Comencemos este emocionante recorrido. ¿Qué te parece?",
        imgSrc: "/ui/laia_triumphant.png",
        imgAlt: "Laia - modelo desbloqueado paso 1",
      },

    ],
    []
  );

  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/modelo" });

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
      v.muted = false;
      v.volume = 1;
      setVideoEnded(false);
      setHasStartedVideo(true);
      await v.play();
    } catch {}
  }

  function handleVideoEnded() {
    setHasStartedVideo(false);
    setVideoEnded(true);
  }

  function goNextFromVideo() {
    setPhase("dialog");
  }

  function handleDialogComplete() {
    setPhase("model");
  }

  function handlePostDialogComplete() {
    goToEmbebido1();
  }

  function goToEmbebido1() {
    writeProgress({ lastRoute: "/embebido-1" });
    router.push("/embebido-1");
  }

  return (
    <div className={styles.stage}>
      <TechTrailBackground className={styles.techBackground} />

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
              controls={false}
              preload="auto"
              onEnded={handleVideoEnded}
            />

            <div className={styles.videoActions}>
              {!hasStartedVideo && !videoEnded ? (
                <button type="button" className={styles.nextBtn} onClick={playVideo}>
                  Reproducir <span className={styles.arrow}>▶</span>
                </button>
              ) : null}

              {videoEnded ? (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={goNextFromVideo}
                >
                  Continuar <span className={styles.arrow}>→</span>
                </button>
              ) : null}
            </div>

            {!hasStartedVideo && !videoEnded ? (
              <p className={styles.videoHint}>Pulsa &quot;Reproducir&quot; para iniciar con audio.</p>
            ) : !videoEnded ? (
              <p className={styles.videoHint}>Reproduciendo... al finalizar se habilitara &quot;Continuar&quot;.</p>
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

            <div className={styles.dialogArea}>
              <CharacterStepDialog
                steps={postModelSteps}
                onComplete={() => handlePostDialogComplete()}
                size="compact"
                density="tight"
                className={styles.dialog}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
