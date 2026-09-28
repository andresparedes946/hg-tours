"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1800;
const EXIT = 750;
export const INTRO_KEY = "hg-intro-seen";

/**
 * Pantalla de carga con contador. Se muestra una vez por sesión.
 * El script inline de layout.tsx agrega `.no-intro` al <html> si ya se vio o si
 * el usuario prefiere menos movimiento; además un fallback CSS la oculta sola.
 */
export default function Preloader({ brand }: { brand: string }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"run" | "out" | "gone">("run");
  const raf = useRef(0);

  useEffect(() => {
    if (document.documentElement.classList.contains("no-intro")) {
      raf.current = requestAnimationFrame(() => setPhase("gone"));
      return () => cancelAnimationFrame(raf.current);
    }
    let timer = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - t0) / DURATION) * 100));
      setProgress(p);
      if (p < 100) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      setPhase("out");
      timer = window.setTimeout(() => setPhase("gone"), EXIT);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`preloader${phase === "out" ? " is-out" : ""}`} role="status" aria-live="polite" aria-label="Cargando">
      <div className="preloader-brand">{brand}</div>
      <div className="preloader-row">
        <div className="preloader-label">Preparando el viaje...</div>
        <div className="preloader-count" aria-hidden="true">
          {String(progress).padStart(3, "0")}
        </div>
      </div>
      <div className="preloader-track">
        <div className="preloader-bar" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}
