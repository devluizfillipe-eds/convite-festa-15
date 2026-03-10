"use client";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [showSecondScreen, setShowSecondScreen] = useState(false);

  const handlePlay = () => {
    if (videoRef.current && !started) {
      videoRef.current.play();
      setStarted(true);
    }
  };

  const handleVideoEnd = () => {
    setTimeout(() => setShowSecondScreen(true), 300); // pequena pausa para suavidade
  };

  return (
    <div className={styles.page}>
      <main className={styles.mainMobile}>
        <div className={styles.transitionContainer}>
          {/* Primeira tela: vídeo */}
          <div
            className={styles.firstScreen}
            style={{
              opacity: showSecondScreen ? 0 : 1,
              pointerEvents: showSecondScreen ? "none" : "auto",
              transition: "opacity 0.8s",
            }}
          >
            <div className={styles.videoContainer}>
              <video
                ref={videoRef}
                className={styles.video}
                src="/video01animação.mp4"
                playsInline
                preload="auto"
                controls={false}
                poster=""
                onClick={handlePlay}
                style={{ pointerEvents: started ? "auto" : "none" }}
                onEnded={handleVideoEnd}
              />
              {/* Botão invisível apenas sobre a área do texto */}
              {!started && (
                <button
                  className={styles.invisibleBtn}
                  onClick={handlePlay}
                  aria-label="Play video"
                />
              )}
            </div>
          </div>
          {/* Segunda tela: imagem de fundo */}
          <div
            className={styles.secondScreen}
            style={{
              opacity: showSecondScreen ? 1 : 0,
              pointerEvents: showSecondScreen ? "auto" : "none",
              transition: "opacity 0.8s",
            }}
          >
            <div className={styles.bgImage} />
          </div>
        </div>
      </main>
    </div>
  );
}
