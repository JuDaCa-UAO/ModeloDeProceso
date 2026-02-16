"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./modelo.module.css";
import Scene3D from "./scene3d";
import { writeProgress } from "../../lib/progress";

const VIDEO_URL = "/videos/intro-modelo.mp4";
const SEEN_KEY = "ai-tech-ed:modelo:videoSeen";

// ✅ Ajusta este valor para controlar la velocidad (ms)
const EXIT_MS = 290;

export default function ModeloClient() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [show3D, setShow3D] = useState(false);

  // videoState: "show" = se ve normal, "exit" = se va a la derecha
  const [videoState, setVideoState] = useState<"show" | "exit">("show");

  useEffect(() => {
    writeProgress({ hasStarted: true, lastRoute: "/modelo" });

    const seen = window.localStorage.getItem(SEEN_KEY) === "1";
    if (seen) setShow3D(true);
  }, []);

  function finishVideo() {
    window.localStorage.setItem(SEEN_KEY, "1");

    // ✅ dispara animación de salida
    setVideoState("exit");

    // ✅ cuando termina la animación, mostramos el 3D
    window.setTimeout(() => {
      setShow3D(true);
    }, EXIT_MS);
  }

  return (
    <div className={styles.stage}>
      <header className={styles.topBar}>
        <Link className={styles.back} href="/">
          ← Volver
        </Link>
        <div className={styles.title}>Modelo</div>
      </header>

      <main className={styles.center}>
        {!show3D ? (
          <div
            className={`${styles.videoWrap} ${
              videoState === "exit" ? styles.videoExitRight : ""
            }`}
            // ✅ Le pasamos la duración a CSS como variable
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
        ) : (
          <>
            <div className={styles.viewer}>
              <Scene3D />
            </div>

            <p className={styles.hint}>
              Arrastra para rotar • Scroll para zoom • Click derecho para pan.
            </p>

            <Link
              href="/etapa-1"
              className={styles.continueBtn}
              onClick={() => writeProgress({ lastRoute: "/etapa-1" })}
            >
              Continuar
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
