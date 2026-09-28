"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor acompañante con etiqueta contextual ([data-cursor]).
 * Solo en dispositivos con puntero fino y sin "reducir movimiento".
 * No reemplaza el cursor del sistema: lo acompaña.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let x = -100, y = -100, cx = x, cy = y, raf = 0, label = "";
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target instanceof Element ? e.target : null;
      let next: string | null = "";
      if (t?.closest("input, textarea, select, label")) next = null;
      else if (t?.closest("a, button")) next = "→";
      else next = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      c.classList.toggle("is-hidden", next === null);
      if (next !== null && next !== label) {
        label = next;
        c.textContent = label;
        c.dataset.size = !label ? "dot" : label.length > 1 ? "lg" : "md";
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      c.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onLeave = () => c.classList.add("is-hidden");
    c.classList.add("is-active");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      c.classList.remove("is-active");
    };
  }, []);

  return <div ref={ref} className="cursor" data-size="dot" aria-hidden="true" />;
}
