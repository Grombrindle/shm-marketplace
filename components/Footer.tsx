"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail } from "lucide-react";
import { CATALOG, PC_BUILDER, CONTACT } from "@/lib/routes";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-high text-surface-high-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">SHM</h3>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              {t(
                "Syria's premier destination for PC hardware, custom builds, and professional assembly services.",
                "الوجهة الأولى في سوريا لأجهزة الكمبيوتر والتجميع المخصص وخدمات التركيب الاحترافية.",
              )}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              {t("Quick Links", "روابط سريعة")}
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <Link
                  href={CATALOG.path}
                  className="hover:opacity-100 transition-opacity"
                >
                  {t("All Products", "جميع المنتجات")}
                </Link>
              </li>
              <li>
                <Link
                  href={PC_BUILDER.path}
                  className="hover:opacity-100 transition-opacity"
                >
                  {t("PC Builder", "بناء الكمبيوتر")}
                </Link>
              </li>
              <li>
                <Link
                  href={CONTACT.path}
                  className="hover:opacity-100 transition-opacity"
                >
                  {t("Contact Us", "تواصل معنا")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("Contact", "التواصل")}</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                {t("Damascus, Syria", "دمشق، سوريا")}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                +963 11 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                info@shm.sy
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-50">
          © 2026 SHM. {t("All rights reserved.", "جميع الحقوق محفوظة.")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
