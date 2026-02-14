import Link from "next/link";
import styles from "./modelo.module.css";
import Scene3D from "./scene3d";

export default function ModeloPage() {
  return (
    <div className={styles.stage}>
      <header className={styles.topBar}>
        <Link className={styles.back} href="/">
          ← Volver
        </Link>
        <div className={styles.title}>Modelo 3D (Interactivo)</div>
      </header>

      <main className={styles.center}>
        <div className={styles.viewer}>
          <Scene3D />
        </div>
        <p className={styles.hint}>
          Arrastra para rotar • Scroll para zoom • Click derecho para arrastrar el objeto.
        </p>
      </main>
    </div>
  );
}
