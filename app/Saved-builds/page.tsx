"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Cpu, Trash2, ArrowRight, Package } from "lucide-react";
import { toast } from "sonner";
import { PC_BUILDER } from "@/lib/routes";

interface SavedBuild {
  id: string;
  name: string;
  date: string;
  selections: Record<
    string,
    {
      id: string;
      name: string;
      price: number;
      specs: string;
      socket?: string;
      brand: string;
    }
  >;
  total: number;
}

const SavedBuildsPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [builds, setBuilds] = useState<SavedBuild[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shm-builds") || "[]");
    setBuilds(saved);
  }, []);

  const deleteBuild = (id: string) => {
    const updated = builds.filter((b) => b.id !== id);
    setBuilds(updated);
    localStorage.setItem("shm-builds", JSON.stringify(updated));
    toast.success(t("Build deleted", "تم حذف التجميعة"));
  };

  const openBuild = (build: SavedBuild) => {
    router.push(`${PC_BUILDER.path}?buildId=${build.id}`);
  };

  const partLabels: Record<string, { en: string; ar: string }> = {
    cpu: { en: "CPU", ar: "المعالج" },
    motherboard: { en: "Motherboard", ar: "اللوحة الأم" },
    gpu: { en: "GPU", ar: "كرت الشاشة" },
    ram: { en: "RAM", ar: "الذاكرة" },
    storage: { en: "Storage", ar: "التخزين" },
    psu: { en: "PSU", ar: "مزود الطاقة" },
    case: { en: "Case", ar: "الصندوق" },
    cooling: { en: "Cooling", ar: "التبريد" },
  };

  return (
    <div className="container py-6 lg:py-10">
      <ScrollReveal>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {t("Saved Builds", "التجميعات المحفوظة")}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {t(
            "Your previously saved PC configurations",
            "تجميعات الكمبيوتر المحفوظة سابقاً",
          )}
        </p>
      </ScrollReveal>

      {builds.length === 0 ? (
        <ScrollReveal>
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              {t("No saved builds yet", "لا توجد تجميعات محفوظة")}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1 mb-6">
              {t(
                "Go to PC Builder and save your first build",
                "اذهب إلى بناء الكمبيوتر واحفظ تجميعتك الأولى",
              )}
            </p>
            <button
              onClick={() => router.push(PC_BUILDER.path)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-container active:scale-[0.97] transition-all"
            >
              {t("Start Building", "ابدأ البناء")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((build, i) => (
            <ScrollReveal key={build.id} delay={i * 80}>
              <div className="bg-card rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-shadow overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold">{build.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {build.date}
                      </p>
                    </div>
                    <span className="font-bold text-lg tabular-nums">
                      ${build.total}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(build.selections).map(([key, comp]) => (
                      <div
                        key={key}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Cpu className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-xs text-muted-foreground w-20 shrink-0">
                          {t(
                            partLabels[key]?.en || key,
                            partLabels[key]?.ar || key,
                          )}
                        </span>
                        <span className="text-xs font-medium truncate">
                          {comp.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border flex">
                  <button
                    onClick={() => openBuild(build)}
                    className="flex-1 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {t("Open in Pc-Builder", "فتح في المُنشئ")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px bg-border" />
                  <button
                    onClick={() => deleteBuild(build.id)}
                    className="px-5 py-3 text-sm text-destructive hover:bg-destructive/5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBuildsPage;
