"use client";
import { useRef, useState, useEffect } from "react";
import { useNavigation } from "../context/NavigationContext";
import styles from "./page.module.css";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  const [showPresentScreen, setShowPresentScreen] = useState(false);
  const { setShowBack, setBackHandler } = useNavigation();

  const handlePlay = () => {
    if (videoRef.current && !started) {
      videoRef.current.play();
      setStarted(true);
    }
  };

  const handleVideoEnd = () => {
    setTimeout(() => setShowSecondScreen(true), 300); // pequena pausa para suavidade
  };

  // Atualiza visibilidade do botão "voltar" e registra handler interno
  useEffect(() => {
    setShowBack(showSecondScreen || showPresentScreen);

    // define handler direto (não uma função que retorna função)
    setBackHandler(() => {
      if (showPresentScreen) {
        setShowPresentScreen(false);
        return;
      }
      if (showSecondScreen) {
        // voltar da segunda tela para a primeira: resetar o vídeo para o frame inicial
        setShowSecondScreen(false);
        setStarted(false);
        if (videoRef.current) {
          try {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            // reload para garantir que o poster seja mostrado em alguns navegadores
            videoRef.current.load();
          } catch (e) {
            // ignore
          }
        }
        return;
      }
    });

    return () => setBackHandler(undefined);
  }, [showSecondScreen, showPresentScreen, setShowBack, setBackHandler]);

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
            onClick={handlePlay}
          >
            <video
              ref={videoRef}
              className={styles.fullscreenVideo}
              src="/video01animação.mp4"
              playsInline
              preload="metadata"
              controls={false}
              poster="/tela1frame%20inicial.png"
              style={{ pointerEvents: started ? "auto" : "none" }}
              onEnded={handleVideoEnd}
            />
          </div>
          {/* Segunda tela: imagem de fundo e botões */}
          <div
            className={styles.secondScreen}
            style={{
              opacity: showSecondScreen ? 1 : 0,
              pointerEvents: showSecondScreen ? "auto" : "none",
              transition: "opacity 0.8s",
            }}
          >
            <div className={styles.bgImage}>
              {/* Botões só aparecem na tela 2 */}
              {showSecondScreen && (
                <>
                  <button
                    className={styles.circleBtn1}
                    onClick={() => {
                      window.open(
                        "https://wa.me/5531988510531?text=ol%C3%A1%20%20minha%20presen%C3%A7a%20est%C3%A1%20confirmada",
                        "_blank",
                      );
                    }}
                  >
                    1
                  </button>
                  <button
                    className={styles.circleBtn2}
                    onClick={() => {
                      window.open(
                        "https://www.google.com/maps?q=Espa%C3%A7o+Bells+recep%C3%A7%C3%B5es+e+eventos+-+R.+Virg%C3%ADlio+de+Melo+Franco,+304+-+Vila+Sao+Paulo,+Contagem+-+MG,+32210-350&ftid=0xa6973239194621:0x2f17a26aa31289d2&entry=gps&shh=CAE&lucs=,94297699,94284505,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI2LjEwLjIuODc3MzE3OTEwMBgAINeCAypILDk0Mjk3Njk5LDk0Mjg0NTA1LDk0MjMxMTg4LDk0MjgwNTY4LDQ3MDcxNzA0LDk0MjE4NjQxLDk0MjgyMTM0LDk0Mjg2ODY5QgJCUg%3D%3D&skid=9ee14688-cffb-403a-ba23-11ef5732eac3&g_st=ic",
                        "_blank",
                      );
                    }}
                  >
                    2
                  </button>
                  <button
                    className={styles.circleBtn3}
                    onClick={() => {
                      setShowPresentScreen(true);
                    }}
                  >
                    3
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Terceira tela: imagem de presentes */}
          <div
            className={styles.presentScreen}
            style={{
              opacity: showPresentScreen ? 1 : 0,
              pointerEvents: showPresentScreen ? "auto" : "none",
              transition: "opacity 0.8s",
            }}
          >
            <div className={styles.presentBgImage}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
