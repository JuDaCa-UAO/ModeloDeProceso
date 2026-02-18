"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CharacterStepDialog.module.css";

export type CharacterDialogStep = {
  text: string;
  imgSrc: string;
  imgAlt?: string;
};

type CharacterStepDialogProps = {
  steps: CharacterDialogStep[];
  characterName?: string;
  className?: string;
  nextLabel?: string;
  size?: "default" | "compact";
  onComplete?: (isComplete: true) => void;
};

const DEFAULT_CHARACTER_NAME = "Laia";
const DEFAULT_NEXT_LABEL = "Siguiente";
const TYPEWRITER_MS = 22;

export default function CharacterStepDialog({
  steps,
  characterName = DEFAULT_CHARACTER_NAME,
  className,
  nextLabel = DEFAULT_NEXT_LABEL,
  size = "default",
  onComplete,
}: CharacterStepDialogProps) {
  const safeSteps = useMemo(
    () => steps.filter((step) => step.text.trim() && step.imgSrc.trim()),
    [steps]
  );
  const [idx, setIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const completionSent = useRef(false);

  useEffect(() => {
    setIdx(0);
    completionSent.current = false;
  }, [safeSteps]);

  if (!safeSteps.length) return null;

  const isLast = idx >= safeSteps.length - 1;
  const step = safeSteps[idx];
  const isTyping = typedChars < step.text.length;
  const displayedText = step.text.slice(0, typedChars);

  useEffect(() => {
    setTypedChars(0);
  }, [idx]);

  useEffect(() => {
    if (!step.text.length || !isTyping) return;

    const timerId = window.setInterval(() => {
      setTypedChars((current) => {
        const next = current + 1;
        return next > step.text.length ? step.text.length : next;
      });
    }, TYPEWRITER_MS);

    return () => window.clearInterval(timerId);
  }, [isTyping, step.text]);

  function goNext() {
    if (isTyping) {
      setTypedChars(step.text.length);
      return;
    }

    if (!isLast) {
      setIdx((current) => Math.min(current + 1, safeSteps.length - 1));
      return;
    }

    if (!completionSent.current) {
      completionSent.current = true;
      onComplete?.(true);
    }
  }

  return (
    <div
      className={`${styles.shell} ${
        size === "compact" ? styles.compact : ""
      } ${className ?? ""}`.trim()}
    >
      <div className={styles.left}>
        <div className={styles.avatarFrame}>
          <Image
            src={step.imgSrc}
            alt={step.imgAlt || characterName}
            fill
            className={styles.avatarImg}
            priority
          />
        </div>
        <div className={styles.avatarTag}>{characterName}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.dialogBox}>
          <div className={styles.dialogText}>
            {displayedText}
            {isTyping ? <span className={styles.cursor} /> : null}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.nextBtn} onClick={goNext}>
              {nextLabel} <span className={styles.arrow}>-&gt;</span>
            </button>

            <div className={styles.counter}>
              {idx + 1}/{safeSteps.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
