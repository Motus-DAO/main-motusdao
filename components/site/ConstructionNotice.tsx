"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProviders";
import { GlassEffect } from "@/components/ui/liquid-glass";

const GLASS = {
  dark: {
    t1: "rgba(255,255,255,0.92)",
    t2: "rgba(255,255,255,0.52)",
    fill: "linear-gradient(135deg, rgba(16, 10, 30, 0.36), rgba(38, 16, 58, 0.30))",
  },
  light: {
    t1: "rgba(14,10,26,0.90)",
    t2: "rgba(14,10,26,0.55)",
    fill: "linear-gradient(135deg, rgba(255, 255, 255, 0.36), rgba(245, 238, 255, 0.30))",
  },
} as const;

export function ConstructionNotice() {
  const { t, theme } = useSite();
  const [open, setOpen] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const bodyId = useId();
  const tok = theme === "light" ? GLASS.light : GLASS.dark;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 border-0 bg-black/40"
        aria-label={t("constructionClose")}
        onClick={() => setOpen(false)}
      />
      <GlassEffect
        className="relative z-10 w-full max-w-md rounded-2xl"
        style={{ background: tok.fill }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={bodyId}
          className="px-6 py-7 md:px-8 md:py-8"
        >
          <p className="section-label">{t("constructionLabel")}</p>
          <h2
            id={titleId}
            className="mt-2 font-heading text-2xl font-bold tracking-tight"
            style={{ color: tok.t1 }}
          >
            {t("constructionTitle")}
          </h2>
          <p
            id={bodyId}
            className="mt-3 text-sm font-normal leading-relaxed"
            style={{ color: tok.t2 }}
          >
            {t("constructionBody")}
          </p>
          <button
            ref={closeRef}
            type="button"
            className="btn-primary mt-7"
            onClick={() => setOpen(false)}
          >
            {t("constructionCta")}
          </button>
        </div>
      </GlassEffect>
    </div>
  );
}
