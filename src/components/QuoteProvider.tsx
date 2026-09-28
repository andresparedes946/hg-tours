"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { emptyQuote, type QuoteForm } from "@/lib/quote";

type QuoteContextValue = {
  form: QuoteForm;
  update: (patch: Partial<QuoteForm>) => void;
  reset: () => void;
  /** Cambia cada vez que otra sección precarga datos (para avisar al formulario). */
  presetKey: number;
  preset: (patch: Partial<QuoteForm>) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<QuoteForm>(emptyQuote);
  const [presetKey, setPresetKey] = useState(0);

  const update = useCallback((patch: Partial<QuoteForm>) => setForm((f) => ({ ...f, ...patch })), []);
  const reset = useCallback(() => setForm(emptyQuote), []);
  const preset = useCallback((patch: Partial<QuoteForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setPresetKey((k) => k + 1);
  }, []);

  const value = useMemo(() => ({ form, update, reset, presetKey, preset }), [form, update, reset, presetKey, preset]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote debe usarse dentro de <QuoteProvider>");
  return ctx;
}
