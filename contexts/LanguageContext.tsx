"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

type Language = "en" | "ar";
const LANGUAGE_KEY = "shm-lang";

interface LanguageContextType {
  lang: Language;
  dir: "ltr" | "rtl";
  toggle: () => void;
  t: (en: string, ar: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback to prevent crash if used outside provider
    return {
      lang: "en" as Language,
      dir: "ltr" as const,
      toggle: () => {},
      t: (en: string, ar: string) => en,
    };
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Default to 'en' strictly. Never empty string.
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage ONLY on client mount
  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === "en" || saved === "ar") {
      setLang(saved);
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever lang changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(LANGUAGE_KEY, lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang, mounted]);

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  // Memoize translation function
  const t = useCallback(
    (en: string, ar: string) => {
      return lang === "en" ? en : ar;
    },
    [lang],
  );

  // Prevent hydration mismatch by rendering default until mounted
  if (!mounted) {
    return <div dir="ltr">{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ lang, dir, toggle, t }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};
