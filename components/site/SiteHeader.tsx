"use client";

import { motion } from "framer-motion";
import { useSite } from "@/components/providers/SiteProviders";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import { LINKS } from "@/lib/site";

const T = {
  dark: {
    t1: "rgba(255,255,255,0.92)",
    t2: "rgba(255,255,255,0.52)",
    toggleTrack: "rgba(255,255,255,0.10)",
    glass:
      "linear-gradient(135deg, rgba(16, 10, 30, 0.36), rgba(38, 16, 58, 0.30))",
  },
  light: {
    t1: "rgba(14,10,26,0.90)",
    t2: "rgba(14,10,26,0.55)",
    toggleTrack: "rgba(0,0,0,0.10)",
    glass:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.36), rgba(245, 238, 255, 0.30))",
  },
} as const;

export function SiteHeader() {
  const { t, locale, setLocale, theme, toggleTheme } = useSite();
  const dark = theme === "dark";
  const tok = dark ? T.dark : T.light;

  return (
    <>
      <GlassFilter />
      <header
        className="fixed inset-x-0 z-[100] px-2.5 md:px-[clamp(12px,3vw,24px)]"
        style={{ top: "max(8px, env(safe-area-inset-top, 0px))" }}
      >
        <GlassEffect
          className="h-14 w-full rounded-2xl px-4 md:px-6"
          style={{ background: tok.glass }}
        >
          <div
            className="flex h-full items-center justify-between"
            style={{
              gap: 16,
              padding: "0 clamp(8px, 2vw, 18px)",
            }}
          >
            <a
              href="#top"
              className="flex items-center gap-2.5 no-underline"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 rounded-lg object-cover"
              />
              <span
                className="hidden md:inline"
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                  fontWeight: 700,
                  color: tok.t1,
                  fontSize: 17,
                  letterSpacing: "-0.01em",
                }}
              >
                {t("brand")}
              </span>
            </a>

            <nav
              className="hidden items-center gap-6 text-sm lg:flex"
              style={{ color: tok.t2 }}
            >
              <a href="#explora" className="transition-opacity hover:opacity-100" style={{ color: tok.t2 }}>
                {t("navExplore")}
              </a>
              <a href="#ecosistema" className="transition-opacity hover:opacity-100" style={{ color: tok.t2 }}>
                {t("navPrinciples")}
              </a>
              <a href="#faq" className="transition-opacity hover:opacity-100" style={{ color: tok.t2 }}>
                {t("navFaq")}
              </a>
              <a
                href={LINKS.hub}
                className="transition-opacity hover:opacity-100"
                style={{ color: tok.t2 }}
                rel="noopener noreferrer"
              >
                Hub
              </a>
            </nav>

            <div className="flex items-center gap-2.5 md:gap-4">
              <div
                className="flex rounded-full p-0.5 text-[11px]"
                style={{ background: tok.toggleTrack }}
                role="group"
                aria-label="Language"
              >
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className="rounded-full px-2 py-1 transition-colors"
                  style={{
                    color: locale === "es" ? tok.t1 : tok.t2,
                    background:
                      locale === "es" ? "rgba(255,255,255,0.15)" : "transparent",
                  }}
                >
                  {t("langEs")}
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className="rounded-full px-2 py-1 transition-colors"
                  style={{
                    color: locale === "en" ? tok.t1 : tok.t2,
                    background:
                      locale === "en" ? "rgba(255,255,255,0.15)" : "transparent",
                  }}
                >
                  {t("langEn")}
                </button>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={dark ? t("themeLight") : t("themeDark")}
                className="relative h-6 w-11 shrink-0 rounded-full border-0 p-0"
                style={{ background: tok.toggleTrack }}
              >
                <motion.span
                  aria-hidden
                  animate={{ x: dark ? 2 : 22 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute top-[3px] left-0 block h-[18px] w-[18px] rounded-full bg-[#9333EA]"
                />
              </button>

              <a
                href="#explora"
                className="hidden whitespace-nowrap rounded-[10px] px-[18px] py-[9px] text-sm font-semibold tracking-wide text-white sm:inline-flex"
                style={{ backgroundImage: "var(--grad-brand)" }}
              >
                {t("heroCta")}
              </a>
            </div>
          </div>
        </GlassEffect>
      </header>
    </>
  );
}
