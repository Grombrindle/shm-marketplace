"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X, Globe, Bookmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { path: "/", en: "Home", ar: "الرئيسية" },
  { path: "/catalog", en: "Catalog", ar: "المتجر" },
  { path: "/Pc-Builder", en: "PC Builder", ar: "بناء الكمبيوتر" },
  { path: "/saved-builds", en: "Saved Builds", ar: "التجميعات المحفوظة" },
  { path: "/contact", en: "Contact", ar: "تواصل معنا" },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, toggle, lang } = useLanguage();
  const pathname = usePathname(); // current route

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface-high text-surface-high-foreground shadow-elevation-2">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tight"
            >
              SHM
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-white/10"
                  }`}
                >
                  {t(link.en, link.ar)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-xs font-medium flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <Link
              href="/catalog"
              className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/saved-builds"
              className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all"
            >
              <Bookmark className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <nav className="absolute top-0 left-0 rtl:left-auto rtl:right-0 h-full w-72 bg-card shadow-elevation-4 p-6 animate-slide-left">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-lg font-bold">SHM</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-muted active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {t(link.en, link.ar)}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
