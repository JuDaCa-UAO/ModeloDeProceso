"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./etapa1.module.css";
import { writeProgress } from "../../lib/progress";

type Step = {
  text: string;
  imgSrc: string;
  imgAlt?: string;
};

export default function Etapa1Client() {
  const router = useRouter();

  // ✅ Edita aquí: textos e imágenes por paso
  const steps: Step[] = useMemo(
    () => [
      {
        text: "Hola, soy Laia. Bienvenido a la etapa 1. Aquí vamos a empezar con una visión general.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - paso 1",
      },
      {
        text: "En esta etapa, vas a entender cómo se estructura el proceso y qué vas a lograr al final.",
        imgSrc: "/ui/laia.png", // cambia por otra imagen cuando tengas variantes
        imgAlt: "Laia - paso 2",
      },
      {
        text: "Cuando estés listo, pasaremos al contenido embebido para continuar la experiencia.",
        imgSrc: "/ui/laia.png",
        imgAlt: "Laia - paso 3",
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  const isLast = idx >= steps.length - 1;
  const step = steps[idx];

  function goNext() {
    if (!isLast) {
      setIdx((v) => v + 1);
      return;
    }

    // ✅ Al terminar, vamos a embebido #1
    writeProgress({ lastRoute: "/embebido-1" });
    router.push("/embebido-1");
  }

  return (
    <div className={styles.stage}>
      <div className={styles.shell}>
        {/* Columna izquierda: Laia */}
        <div className={styles.left}>
          <div className={styles.avatarFrame}>
            <Image
              src={step.imgSrc}
              alt={step.imgAlt || "Laia"}
              fill
              className={styles.avatarImg}
              priority
            />
          </div>
          <div className={styles.avatarTag}>Laia (placeholder)</div>
        </div>

        {/* Columna derecha: texto */}
        <div className={styles.right}>
          <div className={styles.dialogBox}>
            <div className={styles.dialogText}>{step.text}</div>

            <div className={styles.actions}>
              <button type="button" className={styles.nextBtn} onClick={goNext}>
                Siguiente <span className={styles.arrow}>→</span>
              </button>

              {/* Indicador simple de progreso */}
              <div className={styles.counter}>
                {idx + 1}/{steps.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
