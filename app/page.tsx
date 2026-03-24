"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Wrench,
  Truck,
  Shield,
} from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "RTX 4070 Super",
    brand: "NVIDIA",
    price: "$599",
    emoji: "🖥️",
    category: "GPU",
  },
  {
    id: 2,
    name: "Ryzen 7 7800X3D",
    brand: "AMD",
    price: "$349",
    emoji: "⚡",
    category: "CPU",
  },
  {
    id: 3,
    name: "DDR5 32GB Kit",
    brand: "Corsair",
    price: "$129",
    emoji: "💾",
    category: "RAM",
  },
  {
    id: 4,
    name: "990 Pro 2TB",
    brand: "Samsung",
    price: "$169",
    emoji: "💿",
    category: "Storage",
  },
  {
    id: 5,
    name: "ROG Strix B650",
    brand: "ASUS",
    price: "$229",
    emoji: "🔧",
    category: "Motherboard",
  },
  {
    id: 6,
    name: "RX 7800 XT",
    brand: "AMD",
    price: "$499",
    emoji: "🎮",
    category: "GPU",
  },
  {
    id: 7,
    name: "Core i7-14700K",
    brand: "Intel",
    price: "$399",
    emoji: "🔥",
    category: "CPU",
  },
  {
    id: 8,
    name: "RM850x PSU",
    brand: "Corsair",
    price: "$139",
    emoji: "🔌",
    category: "PSU",
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4); // fallback, will update on client

  // Calculate visible count on client and on resize
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(2);
      else if (width < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, featuredProducts.length - visibleCount);

  // Autoplay slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <>
      {/* Hero — clean and focused */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-lg">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white animate-reveal-up"
              style={{ lineHeight: 1.08 }}
            >
              {t("Build Your Dream PC", "ابنِ كمبيوترك المثالي")}
            </h1>
            <p
              className="mt-5 text-lg text-white/65 max-w-md animate-reveal-up"
              style={{ animationDelay: "120ms" }}
            >
              {t(
                "Premium components, expert assembly, and reliable delivery across Syria.",
                "مكونات متميزة، تجميع احترافي، وتوصيل موثوق في جميع أنحاء سوريا.",
              )}
            </p>
            <div
              className="mt-8 animate-reveal-up"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-elevation-2 hover:bg-primary-container active:scale-[0.97] transition-all"
              >
                {t("Start Building", "ابدأ البناء")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Slider */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {t("Popular Hardware", "الأجهزة الأكثر طلباً")}
                </h2>
                <p className="mt-1.5 text-muted-foreground text-sm">
                  {t(
                    "Top picks loved by our customers",
                    "أفضل المنتجات المفضلة لعملائنا",
                  )}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setSliderIndex(Math.max(0, sliderIndex - 1))}
                  disabled={sliderIndex === 0}
                  className="p-2 rounded-xl border border-border hover:bg-muted active:scale-95 transition-all disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setSliderIndex(Math.min(maxIndex, sliderIndex + 1))
                  }
                  disabled={sliderIndex >= maxIndex}
                  className="p-2 rounded-xl border border-border hover:bg-muted active:scale-95 transition-all disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{
                transform: `translateX(-${sliderIndex * (100 / visibleCount)}%)`,
              }}
            >
              {featuredProducts.map((product, i) => (
                <Link
                  href="/catalog"
                  key={product.id}
                  className="shrink-0 group"
                  style={{
                    width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)`,
                  }}
                >
                  <ScrollReveal delay={i * 70}>
                    <div className="bg-card rounded-2xl p-5 shadow-elevation-1 hover:shadow-elevation-3 transition-shadow">
                      <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center text-5xl mb-4">
                        {product.emoji}
                      </div>
                      <span className="text-[11px] font-medium text-primary-container uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-semibold mt-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {product.brand}
                      </p>
                      <p className="font-bold mt-2 tabular-nums">
                        {product.price}
                      </p>
                    </div>
                  </ScrollReveal>
                </Link>
              ))}
            </div>
          </div>

          {/* Slider dots - mobile */}
          <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSliderIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === sliderIndex ? "bg-primary w-5" : "bg-border"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {t("About SHM", "عن SHM")}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t(
                  "Syrian Hardware Marketplace is your trusted destination for PC components and custom builds. We source genuine, high-quality hardware and deliver it safely across all Syrian governorates. Whether you're a gamer, creator, or professional — we've got the right build for you.",
                  "سوق الأجهزة السوري هو وجهتك الموثوقة لمكونات الكمبيوتر والتجميعات المخصصة. نوفر أجهزة أصلية عالية الجودة ونوصلها بأمان إلى جميع المحافظات السورية. سواء كنت لاعبًا أو مبدعًا أو محترفًا — لدينا التجميعة المناسبة لك.",
                )}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 max-w-4xl mx-auto">
            {[
              {
                icon: Cpu,
                en: "Genuine Parts",
                ar: "قطع أصلية",
                descEn: "100% authentic hardware from top brands",
                descAr: "أجهزة أصلية 100% من أفضل العلامات التجارية",
              },
              {
                icon: Wrench,
                en: "Expert Assembly",
                ar: "تجميع احترافي",
                descEn: "Professional build with cable management",
                descAr: "تجميع احترافي مع تنظيم الكابلات",
              },
              {
                icon: Truck,
                en: "Safe Delivery",
                ar: "توصيل آمن",
                descEn: "Nationwide shipping across Syria",
                descAr: "شحن لجميع المحافظات السورية",
              },
              {
                icon: Shield,
                en: "Warranty",
                ar: "ضمان",
                descEn: "Full warranty on all components",
                descAr: "ضمان كامل على جميع المكونات",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 90}>
                <div className="bg-card rounded-2xl p-5 shadow-elevation-1 text-center hover:shadow-elevation-2 transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {t(item.en, item.ar)}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {t(item.descEn, item.descAr)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Go Build */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <ScrollReveal>
            <div className="bg-surface-high rounded-3xl p-10 md:p-16 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-surface-high-foreground"
                style={{ lineHeight: 1.15 }}
              >
                {t("Ready to Build?", "مستعد للبناء؟")}
              </h2>
              <p className="mt-4 text-surface-high-foreground/60 max-w-md mx-auto">
                {t(
                  "Configure your perfect PC with real-time compatibility checks and see estimated performance.",
                  "صمم جهازك المثالي مع فحص التوافق الفوري وشاهد الأداء المتوقع.",
                )}
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-container active:scale-[0.97] transition-all"
              >
                {t("Launch PC Builder", "ابدأ بناء الكمبيوتر")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
