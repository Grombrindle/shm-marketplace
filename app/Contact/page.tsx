"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Send,
  ChevronDown,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const faqs = [
  {
    en: "What areas do you ship to?",
    ar: "ما هي المناطق التي تشحنون إليها؟",
    ansEn:
      "We deliver to all major Syrian governorates including Damascus, Aleppo, Homs, Latakia, and Tartus. Delivery times vary by location.",
    ansAr:
      "نوصل لجميع المحافظات السورية الرئيسية بما في ذلك دمشق وحلب وحمص واللاذقية وطرطوس. تختلف مدة التوصيل حسب الموقع.",
  },
  {
    en: "Do you offer warranty on builds?",
    ar: "هل تقدمون ضمان على التجميع؟",
    ansEn:
      "Yes, all custom builds come with a 1-year assembly warranty. Individual components carry their manufacturer warranty.",
    ansAr:
      "نعم، جميع الأجهزة المجمعة تأتي بضمان تجميع لمدة سنة. تحمل المكونات الفردية ضمان الشركة المصنعة.",
  },
  {
    en: "Can I upgrade my existing PC?",
    ar: "هل يمكنني ترقية جهازي الحالي؟",
    ansEn:
      "Absolutely! Contact us with your current specs and desired upgrades. We'll recommend compatible components and can handle the installation.",
    ansAr:
      "بالتأكيد! تواصل معنا مع مواصفات جهازك الحالية والترقيات المطلوبة وسنوصي بمكونات متوافقة ويمكننا التعامل مع التركيب.",
  },
  {
    en: "What payment methods do you accept?",
    ar: "ما هي طرق الدفع المتاحة؟",
    ansEn:
      "We accept cash on delivery, bank transfer, and in-store payment. Online payment options coming soon.",
    ansAr:
      "نقبل الدفع عند الاستلام والتحويل البنكي والدفع في المتجر. خيارات الدفع الإلكتروني قريباً.",
  },
];

const ContactPage = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("Message sent successfully!", "تم إرسال الرسالة بنجاح!"));
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="container py-8 lg:py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">
            {t("Get in Touch", "تواصل معنا")}
          </h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            {t(
              "Have questions or need a custom build quote? We're here to help.",
              "لديك أسئلة أو تحتاج عرض سعر لتجميع مخصص؟ نحن هنا للمساعدة.",
            )}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-elevation-1 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    {t("Full Name", "الاسم الكامل")}
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder={t("Ahmad Khalil", "أحمد خليل")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    {t("Email", "البريد الإلكتروني")}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="ahmad@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  {t("Phone", "الهاتف")}
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="+963 9XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  {t("Message", "الرسالة")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                  placeholder={t(
                    "Describe your build requirements or question...",
                    "اوصف متطلبات التجميع أو سؤالك...",
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-container active:scale-[0.97] transition-all disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {t("Send Message", "إرسال الرسالة")}
              </button>
            </form>
          </ScrollReveal>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          <ScrollReveal animation="slide-right">
            <div className="bg-card rounded-2xl p-6 shadow-elevation-1 space-y-4">
              {[
                {
                  icon: MapPin,
                  text: t("Damascus, Al-Hamra St.", "دمشق، شارع الحمراء"),
                },
                { icon: Phone, text: "+963 11 123 4567" },
                { icon: Mail, text: "info@shm.sy" },
                {
                  icon: Clock,
                  text: t("Sat-Thu: 10AM - 8PM", "السبت-الخميس: 10ص - 8م"),
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQs */}
          <ScrollReveal animation="slide-right" delay={100}>
            <div className="bg-card rounded-2xl p-6 shadow-elevation-1">
              <h3 className="font-semibold mb-4">
                {t("FAQs", "الأسئلة الشائعة")}
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-3 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
                    >
                      {t(faq.en, faq.ar)}
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-3 pb-3 text-xs text-muted-foreground leading-relaxed animate-reveal-up">
                        {t(faq.ansEn, faq.ansAr)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
