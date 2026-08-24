"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { messages, type Locale, type MessageKey } from "@/lib/messages";

type Theme = "light" | "dark";

type SiteContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: MessageKey) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const LOCALE_KEY = "motus-locale";
const THEME_KEY = "motus-theme";

function applyTheme(theme: Theme) {
  const light = theme === "light";
  document.documentElement.classList.toggle("light", light);
  document.documentElement.classList.toggle("dark", !light);
  document.documentElement.style.colorScheme = theme;
}

export function SiteProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_KEY);
    const storedTheme = window.localStorage.getItem(THEME_KEY);

    const nextLocale: Locale =
      storedLocale === "en" || storedLocale === "es" ? storedLocale : "es";

    /* Motus Main Site defaults to dark (operational design system). */
    let nextTheme: Theme = "dark";
    if (storedTheme === "light" || storedTheme === "dark") {
      nextTheme = storedTheme;
    }

    setLocaleState(nextLocale);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    document.documentElement.lang = nextLocale;
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const t = useCallback(
    (key: MessageKey) => messages[locale][key],
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, theme, setTheme, toggleTheme, t }),
    [locale, setLocale, theme, setTheme, toggleTheme, t],
  );

  return (
    <SiteContext.Provider value={value}>
      <div className={ready ? "opacity-100" : "opacity-100"}>{children}</div>
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSite must be used within SiteProviders");
  }
  return ctx;
}
