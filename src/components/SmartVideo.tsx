"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersLowData } from "@/lib/media-prefs";

type Props = {
  hd: string;
  sd: string;
  poster: string;
  alt: string;
  /**
   * contain: muestra el cuadro completo (sin recortes) y rellena el espacio
   * sobrante con una versión difuminada. cover: llena el contenedor.
   */
  fit?: "contain" | "cover";
  /** Carga inmediata (hero). El resto de los videos se cargan al acercarse. */
  eager?: boolean;
  /** Fondo difuminado animado (usa el mismo video). Si no, usa el póster. */
  blurVideo?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Video de fondo silencioso en loop con póster como respaldo.
 * - No descarga video con "reducir movimiento" o "ahorro de datos": queda el póster.
 * - 720p en pantallas chicas, 1080p en el resto.
 * - Se reproduce solo mientras está en pantalla y reanuda si el navegador lo pausa.
 */
export default function SmartVideo({ hd, sd, poster, alt, fit = "cover", eager = false, blurVideo = false, sizes = "100vw", className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const backRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // Decide si cargar el video y en qué calidad.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || prefersLowData()) return;
    const pick = () => (window.matchMedia("(max-width: 900px)").matches ? sd : hd);
    if (eager) {
      const id = requestAnimationFrame(() => setSrc(pick()));
      return () => cancelAnimationFrame(id);
    }
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(pick());
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, hd, sd]);

  // Reproduce solo en pantalla; reintenta si el navegador lo pausa por su cuenta.
  useEffect(() => {
    const el = wrapRef.current;
    const main = mainRef.current;
    if (!src || !el || !main) return;
    const videos = [main, backRef.current].filter((v): v is HTMLVideoElement => !!v);
    let inView = false;

    const play = () => {
      if (!inView || document.visibilityState !== "visible") return;
      for (const v of videos) {
        v.muted = true;
        if (v.paused) v.play().catch(() => {});
      }
    };
    const pause = () => videos.forEach((v) => v.pause());

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    const onVisibility = () => (document.visibilityState === "visible" ? play() : pause());
    document.addEventListener("visibilitychange", onVisibility);
    const watchdog = window.setInterval(play, 2000);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(watchdog);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`sv sv--${fit}${playing ? " is-playing" : ""}${className ? ` ${className}` : ""}`}>
      {fit === "contain" && (
        <div className="sv-backdrop" aria-hidden="true">
          <Image src={poster} alt="" fill sizes="40vw" className="sv-backdrop-media" loading={eager ? "eager" : "lazy"} />
          {blurVideo && src && (
            <video ref={backRef} className="sv-backdrop-media sv-backdrop-video" src={src} muted loop playsInline preload="auto" tabIndex={-1} />
          )}
        </div>
      )}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="sv-poster"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
      {src && (
        <video
          ref={mainRef}
          className="sv-video"
          src={src}
          muted
          loop
          playsInline
          autoPlay={eager}
          preload={eager ? "auto" : "metadata"}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => {
            setPlaying(false);
            setSrc(null);
          }}
        />
      )}
    </div>
  );
}
