"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "../context/NavigationContext";

export default function TopBar() {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const { showBack, backHandler } = useNavigation();

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      // Assumimos que larguras >= 1024px são desktop/PC
      setShowOverlay(w >= 1024);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleBack = () => {
    // Prioritize in-app back handler when available (e.g. page state)
    if (backHandler) {
      backHandler();
      return;
    }

    // Fallback to browser/next history
    try {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    } catch (e) {
      if (typeof window !== "undefined") window.history.back();
    }
  };

  return (
    <>
      {showBack && (
        <div className="topbar">
          <button className="backBtn" onClick={handleBack} aria-label="Voltar">
            voltar
          </button>
        </div>
      )}

      {showOverlay && (
        <div className="desktopOverlay" role="dialog" aria-modal="true">
          <div className="desktopOverlayMessage">
            Para uma experiencia completa abra esse link no celular
          </div>
        </div>
      )}
    </>
  );
}
