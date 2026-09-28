"use client";

import { useQuote } from "./QuoteProvider";
import type { QuoteForm } from "@/lib/quote";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Datos que se precargan en el cotizador al hacer clic. */
  preset?: Partial<QuoteForm>;
};

/** Enlace al cotizador (#cotizar) que precarga el tipo de servicio u otros datos. */
export default function QuoteLink({ preset, onClick, children, ...rest }: Props) {
  const { preset: apply } = useQuote();
  return (
    <a
      href="#cotizar"
      onClick={(e) => {
        if (preset) apply(preset);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
