"use client";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    if (videoRef.current && !started) {
      videoRef.current.play();
      setStarted(true);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.mainMobile}>
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
      </main>
    </div>
  );
}
