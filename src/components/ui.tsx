/** Etiqueta superior de sección: línea dorada + texto en versalitas. */
export function Eyebrow({ children, tone = "accent", className = "" }: { children: React.ReactNode; tone?: "accent" | "light"; className?: string }) {
  return (
    <div className={`eyebrow eyebrow--${tone} ${className}`}>
      <span className="eyebrow-line" aria-hidden="true" />
      {children}
    </div>
  );
}
