import Image from "next/image";
import styles from "./inicio.module.css";
import ActionButtons from "./ActionButtons";

export default function InicioPage() {
  return (
    <div className={styles.stage}>
      {/* Fondo */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgImageWrap}>
          <Image
            src="/ui/bg-home.png"
            alt="Fondo"
            fill
            priority
            unoptimized
            className={styles.bgImage}
          />
        </div>

        <div className={styles.bgGradient} />
        <div className={styles.glowCyan} />
        <div className={styles.glowFuchsia} />
        <div className={styles.grid} />
        <div className={styles.scanlines} />
      </div>

      <main className={styles.main}>
        <section className={styles.card}>
          <div className={styles.cardRing} />

          <header className={styles.headerPlate}>
            <h1 className={styles.title}>AI TECH-ED</h1>
            <p className={styles.subtitle}>DEMO • MODELO DE PROCESO</p>
          </header>

          <div className={styles.content}>
            <div className={styles.avatarCol}>
              <div className={styles.avatarFrame}>
                <Image
                  src="/ui/laia.png"
                  alt="Personaje (Laia)"
                  fill
                  unoptimized
                  className={styles.avatarImg}
                />
              </div>
            </div>

            {/* ✅ TODOS los botones en el mismo bloque/estilo */}
            <ActionButtons />
          </div>

          <footer className={styles.footer}>
            <span className={styles.tipBadge}>Laia</span>
            <span>
              Yo seré la asistente especializada que se encargará de guiarte a través de esta aventura tecnológica de aprendizaje sobre IA.
            </span>
          </footer>
        </section>
      </main>
    </div>
  );
}
