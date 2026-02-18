import { type MatrixRainBackgroundProps } from "./MatrixRainBackground";

export const SHARED_MATRIX_RAIN_PRESET: Pick<
  MatrixRainBackgroundProps,
  "charSize" | "baseSpeed" | "glowRadius"
> = {
  charSize: 20,
  baseSpeed: 0.5,
  glowRadius: 600,
};
