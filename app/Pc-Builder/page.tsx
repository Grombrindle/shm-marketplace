"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Check,
  AlertTriangle,
  Search,
  Cpu,
  CircuitBoard,
  MonitorSpeaker,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
  Save,
  Gauge,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SAVED_BUILDS } from "@/lib/routes";

interface Component {
  id: string;
  name: string;
  price: number;
  specs: string;
  socket?: string;
  brand: string;
}

interface BuildStep {
  key: string;
  en: string;
  ar: string;
  icon: typeof Cpu;
  options: Component[];
}

const steps: BuildStep[] = [
  {
    key: "cpu",
    en: "CPU",
    ar: "المعالج",
    icon: Cpu,
    options: [
      {
        id: "r7-7800x3d",
        name: "AMD Ryzen 7 7800X3D",
        price: 349,
        specs: "8C/16T, 4.2GHz",
        socket: "AM5",
        brand: "AMD",
      },
      {
        id: "r9-7950x",
        name: "AMD Ryzen 9 7950X",
        price: 549,
        specs: "16C/32T, 4.5GHz",
        socket: "AM5",
        brand: "AMD",
      },
      {
        id: "i7-14700k",
        name: "Intel Core i7-14700K",
        price: 399,
        specs: "20C/28T, 3.4GHz",
        socket: "LGA1700",
        brand: "Intel",
      },
      {
        id: "i9-14900k",
        name: "Intel Core i9-14900K",
        price: 589,
        specs: "24C/32T, 3.2GHz",
        socket: "LGA1700",
        brand: "Intel",
      },
    ],
  },
  {
    key: "motherboard",
    en: "Motherboard",
    ar: "اللوحة الأم",
    icon: CircuitBoard,
    options: [
      {
        id: "b650e",
        name: "ASUS ROG Strix B650-E",
        price: 229,
        specs: "AM5, DDR5, PCIe 5.0",
        socket: "AM5",
        brand: "ASUS",
      },
      {
        id: "x670e",
        name: "MSI MEG X670E ACE",
        price: 449,
        specs: "AM5, DDR5, WiFi 6E",
        socket: "AM5",
        brand: "MSI",
      },
      {
        id: "z790",
        name: "ASUS ROG Maximus Z790",
        price: 399,
        specs: "LGA1700, DDR5",
        socket: "LGA1700",
        brand: "ASUS",
      },
      {
        id: "b760",
        name: "MSI MAG B760 Tomahawk",
        price: 189,
        specs: "LGA1700, DDR5",
        socket: "LGA1700",
        brand: "MSI",
      },
    ],
  },
  {
    key: "gpu",
    en: "GPU",
    ar: "كرت الشاشة",
    icon: MonitorSpeaker,
    options: [
      {
        id: "4070s",
        name: "RTX 4070 Super",
        price: 599,
        specs: "12GB GDDR6X",
        brand: "NVIDIA",
      },
      {
        id: "4080s",
        name: "RTX 4080 Super",
        price: 999,
        specs: "16GB GDDR6X",
        brand: "NVIDIA",
      },
      {
        id: "7800xt",
        name: "RX 7800 XT",
        price: 499,
        specs: "16GB GDDR6",
        brand: "AMD",
      },
      {
        id: "7900xtx",
        name: "RX 7900 XTX",
        price: 949,
        specs: "24GB GDDR6",
        brand: "AMD",
      },
    ],
  },
  {
    key: "ram",
    en: "RAM",
    ar: "الذاكرة",
    icon: MemoryStick,
    options: [
      {
        id: "32gb-5600",
        name: "Corsair 32GB DDR5-5600",
        price: 109,
        specs: "2x16GB, CL36",
        brand: "Corsair",
      },
      {
        id: "32gb-6000",
        name: "G.Skill 32GB DDR5-6000",
        price: 129,
        specs: "2x16GB, CL30",
        brand: "G.Skill",
      },
      {
        id: "64gb-5600",
        name: "Corsair 64GB DDR5-5600",
        price: 209,
        specs: "2x32GB, CL36",
        brand: "Corsair",
      },
    ],
  },
  {
    key: "storage",
    en: "Storage",
    ar: "التخزين",
    icon: HardDrive,
    options: [
      {
        id: "990pro-1tb",
        name: "Samsung 990 Pro 1TB",
        price: 109,
        specs: "NVMe, 7450MB/s",
        brand: "Samsung",
      },
      {
        id: "990pro-2tb",
        name: "Samsung 990 Pro 2TB",
        price: 169,
        specs: "NVMe, 7450MB/s",
        brand: "Samsung",
      },
      {
        id: "sn850x-2tb",
        name: "WD Black SN850X 2TB",
        price: 149,
        specs: "NVMe, 7300MB/s",
        brand: "Western Digital",
      },
    ],
  },
  {
    key: "psu",
    en: "Power Supply",
    ar: "مزود الطاقة",
    icon: Zap,
    options: [
      {
        id: "rm850x",
        name: "Corsair RM850x",
        price: 139,
        specs: "850W, 80+ Gold",
        brand: "Corsair",
      },
      {
        id: "rm1000x",
        name: "Corsair RM1000x",
        price: 189,
        specs: "1000W, 80+ Gold",
        brand: "Corsair",
      },
      {
        id: "toughpower-850",
        name: "Thermaltake 850W",
        price: 119,
        specs: "850W, 80+ Gold",
        brand: "Thermaltake",
      },
    ],
  },
  {
    key: "case",
    en: "Case",
    ar: "الصندوق",
    icon: Box,
    options: [
      {
        id: "h7",
        name: "NZXT H7 Flow",
        price: 129,
        specs: "ATX, Mesh Front",
        brand: "NZXT",
      },
      {
        id: "4000d",
        name: "Corsair 4000D Airflow",
        price: 104,
        specs: "ATX, Mesh Front",
        brand: "Corsair",
      },
      {
        id: "lancool3",
        name: "Lian Li Lancool III",
        price: 149,
        specs: "E-ATX, Mesh",
        brand: "Lian Li",
      },
    ],
  },
  {
    key: "cooling",
    en: "Cooling",
    ar: "التبريد",
    icon: Fan,
    options: [
      {
        id: "ak620",
        name: "DeepCool AK620",
        price: 64,
        specs: "Air, Dual Tower",
        brand: "DeepCool",
      },
      {
        id: "x63",
        name: "NZXT Kraken X63",
        price: 149,
        specs: "AIO, 280mm",
        brand: "NZXT",
      },
      {
        id: "h150i",
        name: "Corsair H150i Elite",
        price: 189,
        specs: "AIO, 360mm",
        brand: "Corsair",
      },
    ],
  },
];

const getPerformanceScore = (selections: Record<string, Component>) => {
  const cpu = selections.cpu;
  const gpu = selections.gpu;
  const ram = selections.ram;
  if (!cpu || !gpu || !ram) return null;

  let score = 0;
  if (cpu.id === "i9-14900k" || cpu.id === "r9-7950x") score += 95;
  else if (cpu.id === "i7-14700k") score += 85;
  else score += 80;
  if (gpu.id === "4080s" || gpu.id === "7900xtx") score += 95;
  else if (gpu.id === "4070s") score += 80;
  else score += 75;
  if (ram.id === "64gb-5600") score += 90;
  else if (ram.id === "32gb-6000") score += 85;
  else score += 75;

  return Math.round(score / 3);
};

const getPerformanceTier = (score: number) => {
  if (score >= 90)
    return { en: "Ultra", ar: "فائق", color: "text-primary-container" };
  if (score >= 80) return { en: "High", ar: "عالي", color: "text-primary" };
  return { en: "Mid-Range", ar: "متوسط", color: "text-muted-foreground" };
};

function BuildLoader({
  onBuildLoaded,
}: {
  onBuildLoaded: (selections: Record<string, Component>) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const buildId = searchParams.get("buildId");
    if (buildId) {
      const savedBuilds = JSON.parse(
        localStorage.getItem("shm-builds") || "[]",
      );
      const build = savedBuilds.find((b: any) => b.id === buildId);
      if (build?.selections) {
        onBuildLoaded(build.selections);
      }
    }
  }, [searchParams, onBuildLoaded]);

  return null;
}

const PCBuilderPage = () => {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("cpu");
  const [selections, setSelections] = useState<Record<string, Component>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showPerformance, setShowPerformance] = useState(false);

  const handleBuildLoaded = (loadedSelections: Record<string, Component>) => {
    setSelections(loadedSelections);
  };

  const currentStep = steps.find((s) => s.key === activeTab)!;
  const cpuSocket = selections.cpu?.socket;

  const filteredOptions = currentStep.options.filter((comp) => {
    if (!searchQuery) return true;
    return (
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.specs.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const selectComponent = (comp: Component) => {
    if (activeTab === "motherboard" && cpuSocket && comp.socket !== cpuSocket) {
      toast.error(
        t(
          `Incompatible! This motherboard requires ${comp.socket} but your CPU uses ${cpuSocket}.`,
          `غير متوافق! هذه اللوحة تتطلب ${comp.socket} لكن المعالج يستخدم ${cpuSocket}.`,
        ),
      );
      return;
    }
    setSelections((prev) => ({ ...prev, [activeTab]: comp }));
    toast.success(t(`${comp.name} selected!`, `تم اختيار ${comp.name}!`));
  };

  const removeComponent = (key: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const total = Object.values(selections).reduce((sum, c) => sum + c.price, 0);
  const perfScore = getPerformanceScore(selections);
  const canShowPerf = !!(selections.cpu && selections.gpu && selections.ram);

  const saveBuild = () => {
    if (Object.keys(selections).length === 0) {
      toast.error(
        t(
          "Select at least one component to save",
          "اختر مكون واحد على الأقل للحفظ",
        ),
      );
      return;
    }
    const saved = JSON.parse(localStorage.getItem("shm-builds") || "[]");
    const build = {
      id: Date.now().toString(),
      name: t(`Build ${saved.length + 1}`, `التجميعة ${saved.length + 1}`),
      date: new Date().toLocaleDateString(),
      selections,
      total,
    };
    saved.push(build);
    localStorage.setItem("shm-builds", JSON.stringify(saved));
    toast.success(t("Build saved!", "تم حفظ التجميعة!"));
  };

  return (
    <>
      <Suspense fallback={null}>
        <BuildLoader onBuildLoaded={handleBuildLoaded} />
      </Suspense>

      <div className="container py-6 lg:py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {t("PC Builder", "بناء الكمبيوتر")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  "Pick your parts and build your dream machine",
                  "اختر مكوناتك وابنِ جهاز أحلامك",
                )}
              </p>
            </div>
            <button
              onClick={saveBuild}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              {t("Save Build", "حفظ التجميعة")}
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex gap-1 overflow-x-auto pb-3 mb-6 -mx-1 px-1 scrollbar-none">
            {steps.map((s) => {
              const isActive = activeTab === s.key;
              const hasSelection = !!selections[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => {
                    setActiveTab(s.key);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-elevation-1"
                      : hasSelection
                        ? "bg-primary/10 text-primary-container border border-primary/20"
                        : "bg-card border border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {hasSelection && !isActive ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <s.icon className="w-3.5 h-3.5" />
                  )}
                  {t(s.en, s.ar)}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative mb-5 max-w-md">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t(
                `Search ${currentStep.en}...`,
                `ابحث في ${currentStep.ar}...`,
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
          {filteredOptions.map((comp, i) => {
            const selected = selections[activeTab]?.id === comp.id;
            const incompatible =
              activeTab === "motherboard" &&
              cpuSocket &&
              comp.socket !== cpuSocket;
            return (
              <ScrollReveal key={comp.id} delay={i * 50}>
                <button
                  onClick={() => selectComponent(comp)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                    selected
                      ? "border-primary bg-primary/5 shadow-elevation-2"
                      : incompatible
                        ? "border-destructive/20 opacity-50 cursor-not-allowed"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-elevation-1"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                        {comp.brand}
                      </p>
                      <h3 className="font-semibold text-sm mt-0.5 truncate">
                        {comp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {comp.specs}
                      </p>
                      {incompatible && (
                        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {t("Socket mismatch", "عدم توافق")}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-bold text-sm tabular-nums">
                        ${comp.price}
                      </span>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
          {filteredOptions.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <p className="font-medium">
                {t("No results found", "لا توجد نتائج")}
              </p>
              <p className="text-sm mt-1">
                {t("Try a different search term", "جرب كلمة بحث مختلفة")}
              </p>
            </div>
          )}
        </div>

        <ScrollReveal>
          <div className="bg-card rounded-2xl shadow-elevation-2 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">
                {t("Your Build", "تجميعتك")}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {Object.keys(selections).length}/{steps.length}{" "}
                  {t("parts", "قطع")}
                </span>
                <span className="text-lg font-bold tabular-nums">${total}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {steps.map((s) => {
                const sel = selections[s.key];
                return (
                  <div
                    key={s.key}
                    onClick={() => {
                      if (!sel) {
                        setActiveTab(s.key);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`rounded-xl p-3.5 border-2 border-dashed transition-all ${
                      sel
                        ? "border-primary/30 bg-primary/5"
                        : "border-border/50 bg-muted/30 cursor-pointer hover:border-primary/20 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <s.icon
                        className={`w-4 h-4 ${
                          sel ? "text-primary" : "text-muted-foreground/50"
                        }`}
                      />
                      <span className="text-xs font-medium text-muted-foreground">
                        {t(s.en, s.ar)}
                      </span>
                      {sel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeComponent(s.key);
                          }}
                          className="ml-auto p-0.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    {sel ? (
                      <div>
                        <p className="font-semibold text-sm truncate">
                          {sel.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ${sel.price}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground/50 italic">
                        {t("Waiting to be picked...", "بانتظار الاختيار...")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                disabled={!canShowPerf}
                onClick={() => setShowPerformance(!showPerformance)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary-container active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Gauge className="w-4 h-4" />
                {t("Show Performance", "عرض الأداء")}
              </button>
              {!canShowPerf && (
                <p className="text-xs text-muted-foreground">
                  {t(
                    "Select CPU, GPU, and RAM to see performance estimate",
                    "اختر المعالج وكرت الشاشة والذاكرة لرؤية تقدير الأداء",
                  )}
                </p>
              )}
              <button
                onClick={() => {
                  saveBuild();
                  // Optional: redirect to saved builds after save
                  // router.push(SAVED_BUILDS.path);
                }}
                className="sm:hidden inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                {t("Save Build", "حفظ التجميعة")}
              </button>
            </div>

            {showPerformance && perfScore && (
              <div className="mt-5 p-5 bg-muted/50 rounded-xl animate-reveal-up">
                <h3 className="font-semibold mb-3">
                  {t("Estimated Performance", "الأداء المتوقع")}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        strokeDasharray={`${perfScore}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-lg tabular-nums">
                      {perfScore}
                    </span>
                  </div>
                  <div>
                    <p
                      className={`font-bold text-lg ${getPerformanceTier(perfScore).color}`}
                    >
                      {t(
                        getPerformanceTier(perfScore).en,
                        getPerformanceTier(perfScore).ar,
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {perfScore >= 90
                        ? t(
                            "Excellent for 4K gaming & heavy workloads",
                            "ممتاز للألعاب بدقة 4K والأعمال الثقيلة",
                          )
                        : perfScore >= 80
                          ? t(
                              "Great for 1440p gaming & productivity",
                              "رائع للألعاب بدقة 1440p والإنتاجية",
                            )
                          : t(
                              "Solid for 1080p gaming & everyday tasks",
                              "جيد للألعاب بدقة 1080p والمهام اليومية",
                            )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </>
  );
};

export default PCBuilderPage;
