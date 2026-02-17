"use client";

import { useEffect, useRef } from "react";
import styles from "./MatrixRainBackground.module.css";

type MatrixRainBackgroundProps = {
  className?: string;
  charSize?: number;
  baseSpeed?: number;
  glowRadius?: number;
};

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+-/\\<>[]{}";

function randomChar() {
  const index = Math.floor(Math.random() * CHARSET.length);
  return CHARSET[index];
}

export default function MatrixRainBackground({
  className,
  charSize = 20,
  baseSpeed = 0.4,
  glowRadius = 600,
}: MatrixRainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    if (!canvasMaybe) return;

    const contextMaybe = canvasMaybe.getContext("2d");
    if (!contextMaybe) return;

    const canvas: HTMLCanvasElement = canvasMaybe;
    const context: CanvasRenderingContext2D = contextMaybe;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let phases: number[] = [];

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resetColumns() {
      columns = Math.max(1, Math.floor(width / charSize) + 1);
      drops = Array.from(
        { length: columns },
        () => Math.random() * height - height * Math.random()
      );
      speeds = Array.from({ length: columns }, () => 0.7 + Math.random() * 0.8);
      phases = Array.from({ length: columns }, () => Math.random() * Math.PI * 2);
    }

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetColumns();
    }

    function onPointerMove(event: MouseEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touch) return;
      pointer.x = touch.clientX;
      pointer.y = touch.clientY;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function drawFrame(time: number) {
      context.fillStyle = "rgba(8, 16, 28, 0.34)";
      context.fillRect(0, 0, width, height);

      context.font = `${charSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      context.textBaseline = "top";
      context.shadowBlur = 0;

      for (let i = 0; i < columns; i += 1) {
        const baseX = i * charSize;
        const y = drops[i];
        const char = randomChar();

        let influence = 0;
        if (pointer.active) {
          const distance = Math.hypot(pointer.x - baseX, pointer.y - y);
          influence = Math.max(0, 1 - distance / glowRadius);
        }

        const driftWave = Math.sin(time * 0.002 + phases[i]) * 2;
        const mousePull =
          pointer.active ? (pointer.x - baseX) * influence * 0.08 : 0;
        const x = baseX + driftWave + mousePull;

        const alpha = 0.34 + influence * 0.6;
        const red = Math.round(90 + influence * 70);
        const green = Math.round(188 + influence * 50);
        const blue = Math.round(235 + influence * 20);

        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        context.shadowBlur = influence * 20;
        context.shadowColor = `rgba(145, 225, 255, ${influence * 0.85})`;
        context.fillText(char, x, y);

        const fallSpeed =
          charSize * baseSpeed * speeds[i] * (prefersReducedMotion ? 0.35 : 1);
        drops[i] += fallSpeed + influence * 1.6;

        if (drops[i] > height + charSize * 1.5) {
          drops[i] = -Math.random() * (height * 0.35);
        }
      }

      rafId = window.requestAnimationFrame(drawFrame);
    }

    resize();
    context.fillStyle = "rgb(4, 10, 20)";
    context.fillRect(0, 0, width, height);
    rafId = window.requestAnimationFrame(drawFrame);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseout", onPointerLeave, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onPointerLeave);
    };
  }, [baseSpeed, charSize, glowRadius]);

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}