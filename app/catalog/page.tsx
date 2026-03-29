"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Search,
  Star,
  ShoppingCart,
  SlidersHorizontal,
  X,
  ChevronDown,
  Cpu,
} from "lucide-react";
import { toast } from "sonner";
import { DYNAMIC_ROUTES } from "@/lib/routes";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
  socket?: string;
  specs?: string;
  description?: string;
}

const categories = [
  { key: "All", en: "All", ar: "الكل" },
  { key: "GPUs", en: "GPUs", ar: "كروت الشاشة" },
  { key: "CPUs", en: "CPUs", ar: "المعالجات" },
  { key: "Motherboards", en: "Motherboards", ar: "اللوحات الأم" },
  { key: "RAM", en: "RAM", ar: "الذاكرة" },
  { key: "Storage", en: "Storage", ar: "التخزين" },
  { key: "PSUs", en: "PSUs", ar: "مزودات الطاقة" },
  { key: "Cases", en: "Cases", ar: "الصناديق" },
  { key: "Cooling", en: "Cooling", ar: "التبريد" },
];

const brandsByCategory: Record<string, string[]> = {
  All: [
    "NVIDIA",
    "AMD",
    "Intel",
    "ASUS",
    "MSI",
    "Corsair",
    "Samsung",
    "NZXT",
    "G.Skill",
    "Thermaltake",
    "DeepCool",
    "Lian Li",
    "Western Digital",
  ],
  GPUs: ["NVIDIA", "AMD", "ASUS", "MSI"],
  CPUs: ["AMD", "Intel"],
  Motherboards: ["ASUS", "MSI"],
  RAM: ["Corsair", "G.Skill"],
  Storage: ["Samsung", "Western Digital"],
  PSUs: ["Corsair", "Thermaltake"],
  Cases: ["NZXT", "Corsair", "Lian Li"],
  Cooling: ["DeepCool", "NZXT", "Corsair"],
};

const socketOptions = ["AM5", "LGA1700"];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const allProducts: Product[] = [
  {
    id: 1,
    name: "GeForce RTX 4070 Super",
    brand: "NVIDIA",
    category: "GPUs",
    price: 599,
    rating: 4.8,
    inStock: true,
    specs: "12GB GDDR6X, 192-bit, PCIe 4.0",
    description:
      "The RTX 4070 Super delivers excellent 1440p gaming performance with DLSS 3.0 and ray tracing.",
  },
  {
    id: 2,
    name: "GeForce RTX 4080 Super",
    brand: "NVIDIA",
    category: "GPUs",
    price: 999,
    rating: 4.9,
    inStock: true,
    specs: "16GB GDDR6X, 256-bit, PCIe 4.0",
    description:
      "Ultimate 4K gaming card with massive performance and AI acceleration.",
  },
  {
    id: 3,
    name: "GeForce RTX 4060 Ti",
    brand: "NVIDIA",
    category: "GPUs",
    price: 399,
    rating: 4.6,
    inStock: true,
    specs: "8GB GDDR6, 128-bit",
    description: "Great for 1080p gaming and entry-level 1440p.",
  },
  {
    id: 4,
    name: "Radeon RX 7800 XT",
    brand: "AMD",
    category: "GPUs",
    price: 499,
    rating: 4.7,
    inStock: true,
    specs: "16GB GDDR6, 256-bit",
    description: "Excellent value for 1440p gaming with high refresh rates.",
  },
  {
    id: 5,
    name: "Radeon RX 7900 XTX",
    brand: "AMD",
    category: "GPUs",
    price: 949,
    rating: 4.8,
    inStock: false,
    specs: "24GB GDDR6, 384-bit",
    description: "AMD's flagship for 4K gaming and content creation.",
  },
  {
    id: 6,
    name: "Ryzen 7 7800X3D",
    brand: "AMD",
    category: "CPUs",
    price: 349,
    rating: 4.9,
    inStock: true,
    socket: "AM5",
    specs: "8C/16T, 4.2GHz, 3D V-Cache",
    description: "Gaming-focused CPU with incredible cache performance.",
  },
  {
    id: 7,
    name: "Ryzen 9 7950X",
    brand: "AMD",
    category: "CPUs",
    price: 549,
    rating: 4.8,
    inStock: true,
    socket: "AM5",
    specs: "16C/32T, 4.5GHz",
    description: "16-core beast for productivity and gaming.",
  },
  {
    id: 8,
    name: "Core i7-14700K",
    brand: "Intel",
    category: "CPUs",
    price: 399,
    rating: 4.7,
    inStock: true,
    socket: "LGA1700",
    specs: "20C/28T, 3.4GHz",
    description: "Excellent hybrid architecture for gaming and multitasking.",
  },
  {
    id: 9,
    name: "Core i9-14900K",
    brand: "Intel",
    category: "CPUs",
    price: 589,
    rating: 4.9,
    inStock: true,
    socket: "LGA1700",
    specs: "24C/32T, 3.2GHz",
    description: "Top-tier performance for extreme workloads and gaming.",
  },
  {
    id: 10,
    name: "ROG Strix B650-E",
    brand: "ASUS",
    category: "Motherboards",
    price: 229,
    rating: 4.6,
    inStock: true,
    socket: "AM5",
    specs: "AM5, DDR5, PCIe 5.0",
    description: "Premium B650 motherboard with PCIe 5.0 support.",
  },
  {
    id: 11,
    name: "MEG X670E ACE",
    brand: "MSI",
    category: "Motherboards",
    price: 449,
    rating: 4.7,
    inStock: true,
    socket: "AM5",
    specs: "AM5, DDR5, WiFi 6E",
    description: "High-end X670E board for extreme overclocking.",
  },
  {
    id: 12,
    name: "ROG Maximus Z790",
    brand: "ASUS",
    category: "Motherboards",
    price: 399,
    rating: 4.8,
    inStock: false,
    socket: "LGA1700",
    specs: "LGA1700, DDR5",
    description: "Top-tier Z790 board for Intel 13th/14th gen.",
  },
  {
    id: 13,
    name: "MAG B760 Tomahawk",
    brand: "MSI",
    category: "Motherboards",
    price: 189,
    rating: 4.5,
    inStock: true,
    socket: "LGA1700",
    specs: "LGA1700, DDR5",
    description: "Solid B760 board with great features.",
  },
  {
    id: 14,
    name: "Vengeance DDR5 32GB-5600",
    brand: "Corsair",
    category: "RAM",
    price: 109,
    rating: 4.6,
    inStock: true,
    specs: "2x16GB, CL36",
    description: "Reliable DDR5 kit for mainstream builds.",
  },
  {
    id: 15,
    name: "Trident Z5 DDR5 32GB-6000",
    brand: "G.Skill",
    category: "RAM",
    price: 129,
    rating: 4.8,
    inStock: true,
    specs: "2x16GB, CL30",
    description: "High-performance RGB DDR5 memory.",
  },
  {
    id: 16,
    name: "Vengeance DDR5 64GB-5600",
    brand: "Corsair",
    category: "RAM",
    price: 209,
    rating: 4.7,
    inStock: true,
    specs: "2x32GB, CL36",
    description: "Large capacity for heavy multitasking.",
  },
  {
    id: 17,
    name: "990 Pro 1TB NVMe",
    brand: "Samsung",
    category: "Storage",
    price: 109,
    rating: 4.8,
    inStock: true,
    specs: "NVMe, 7450MB/s",
    description: "Extremely fast PCIe 4.0 SSD.",
  },
  {
    id: 18,
    name: "990 Pro 2TB NVMe",
    brand: "Samsung",
    category: "Storage",
    price: 169,
    rating: 4.9,
    inStock: true,
    specs: "NVMe, 7450MB/s",
    description: "Double the capacity, same blazing speed.",
  },
  {
    id: 19,
    name: "WD Black SN850X 2TB",
    brand: "Western Digital",
    category: "Storage",
    price: 149,
    rating: 4.7,
    inStock: true,
    specs: "NVMe, 7300MB/s",
    description: "Top-tier gaming SSD with heatsink option.",
  },
  {
    id: 20,
    name: "RM850x",
    brand: "Corsair",
    category: "PSUs",
    price: 139,
    rating: 4.7,
    inStock: true,
    specs: "850W, 80+ Gold",
    description: "Fully modular, quiet operation.",
  },
  {
    id: 21,
    name: "RM1000x",
    brand: "Corsair",
    category: "PSUs",
    price: 189,
    rating: 4.8,
    inStock: true,
    specs: "1000W, 80+ Gold",
    description: "High-wattage for power-hungry builds.",
  },
  {
    id: 22,
    name: "Toughpower GF3 850W",
    brand: "Thermaltake",
    category: "PSUs",
    price: 119,
    rating: 4.5,
    inStock: true,
    specs: "850W, 80+ Gold",
    description: "ATX 3.0 ready, compact design.",
  },
  {
    id: 23,
    name: "H7 Flow",
    brand: "NZXT",
    category: "Cases",
    price: 129,
    rating: 4.6,
    inStock: true,
    specs: "ATX, Mesh Front",
    description: "High airflow case with clean aesthetics.",
  },
  {
    id: 24,
    name: "4000D Airflow",
    brand: "Corsair",
    category: "Cases",
    price: 104,
    rating: 4.7,
    inStock: true,
    specs: "ATX, Mesh Front",
    description: "Popular mid-tower with excellent cooling.",
  },
  {
    id: 25,
    name: "Lancool III",
    brand: "Lian Li",
    category: "Cases",
    price: 149,
    rating: 4.6,
    inStock: true,
    specs: "E-ATX, Mesh",
    description: "Spacious case with versatile cooling.",
  },
  {
    id: 26,
    name: "AK620",
    brand: "DeepCool",
    category: "Cooling",
    price: 64,
    rating: 4.5,
    inStock: true,
    specs: "Air, Dual Tower",
    description: "High-performance air cooler.",
  },
  {
    id: 27,
    name: "Kraken X63",
    brand: "NZXT",
    category: "Cooling",
    price: 149,
    rating: 4.6,
    inStock: false,
    specs: "AIO, 280mm",
    description: "Premium AIO with RGB pump.",
  },
  {
    id: 28,
    name: "H150i Elite",
    brand: "Corsair",
    category: "Cooling",
    price: 189,
    rating: 4.7,
    inStock: true,
    specs: "AIO, 360mm",
    description: "High-performance 360mm liquid cooler.",
  },
];

const sortOptions = [
  { value: "newest", en: "Newest", ar: "الأحدث" },
  { value: "price-asc", en: "Price: Low → High", ar: "السعر: الأقل" },
  { value: "price-desc", en: "Price: High → Low", ar: "السعر: الأعلى" },
  { value: "rating", en: "Top Rated", ar: "الأعلى تقييماً" },
];

const CatalogPage = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSocket, setSelectedSocket] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 1100]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const availableBrands =
    brandsByCategory[selectedCategory] || brandsByCategory.All;
  const showSocketFilter =
    selectedCategory === "CPUs" ||
    selectedCategory === "Motherboards" ||
    selectedCategory === "All";

  let filtered = allProducts.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory)
      return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;
    if (selectedSocket && p.socket && p.socket !== selectedSocket) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSocket(null);
    setPriceRange([0, 1100]);
    setSearch("");
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedSocket ||
    priceRange[1] < 1100 ||
    search;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3">{t("Category", "الفئة")}</h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setSelectedCategory(c.key);
                setSelectedBrands([]);
                setSelectedSocket(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                selectedCategory === c.key
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {t(c.en, c.ar)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">
          {t("Brands", "العلامات التجارية")}
        </h3>
        <div className="space-y-1.5">
          {availableBrands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2.5 cursor-pointer text-sm py-1 px-1 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="rounded border-border text-primary focus:ring-ring w-4 h-4"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {showSocketFilter && (
        <div>
          <h3 className="font-semibold text-sm mb-3">
            {t("Socket", "المقبس")}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSocket(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                !selectedSocket
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {t("All", "الكل")}
            </button>
            {socketOptions.map((s) => (
              <button
                key={s}
                onClick={() =>
                  setSelectedSocket(selectedSocket === s ? null : s)
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                  selectedSocket === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-sm mb-3">
          {t("Price Range", "نطاق السعر")}
        </h3>
        <input
          type="range"
          min={0}
          max={1100}
          step={10}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1 tabular-nums">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2 text-sm text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
        >
          {t("Clear All Filters", "مسح كل الفلاتر")}
        </button>
      )}
    </div>
  );

  return (
    <div className="container py-6 lg:py-10">
      <ScrollReveal>
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {t("Hardware Catalog", "كتالوج الأجهزة")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t(
              "Browse and find the perfect components",
              "تصفح وابحث عن المكونات المثالية",
            )}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t(
                "Search by name, brand...",
                "ابحث بالاسم أو العلامة التجارية...",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 rtl:pl-4 rtl:pr-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden px-4 py-3 border border-border rounded-xl hover:bg-muted active:scale-95 transition-all flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">{t("Filters", "فلاتر")}</span>
          </button>
        </div>
      </ScrollReveal>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-60 shrink-0">
          <ScrollReveal animation="slide-left">
            <div className="sticky top-24 bg-card rounded-2xl p-5 shadow-elevation-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <FilterPanel />
            </div>
          </ScrollReveal>
        </aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setFiltersOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 max-h-[75vh] overflow-y-auto animate-reveal-up">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-lg">
                  {t("Filters", "الفلاتر")}
                </h2>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground tabular-nums">
                {filtered.length}
              </span>{" "}
              {t("products", "منتج")}
            </p>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-border rounded-xl px-4 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.en, o.ar)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product, i) => {
              const productSlug = slugify(product.name);
              return (
                <ScrollReveal key={product.id} delay={i * 40}>
                  <div className="group bg-card rounded-2xl p-4 shadow-elevation-1 hover:shadow-elevation-3 transition-shadow relative">
                    {!product.inStock && (
                      <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-destructive text-destructive-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {t("Out of Stock", "غير متوفر")}
                      </span>
                    )}
                    <Link href={DYNAMIC_ROUTES.PRODUCT_DETAIL(productSlug)}>
                      <div>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center mb-3">
                          <Cpu className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h3 className="font-semibold text-sm mt-0.5 line-clamp-2">
                          {product.name}
                        </h3>
                        {product.socket && (
                          <span className="inline-block mt-1 text-[10px] bg-muted px-2 py-0.5 rounded-md font-medium">
                            {product.socket}
                          </span>
                        )}
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {product.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold tabular-nums">
                            ${product.price}
                          </span>
                          <button
                            disabled={!product.inStock}
                            onClick={(e) => {
                              e.preventDefault();
                              toast.info(
                                t(
                                  "Add to cart coming soon",
                                  "الإضافة إلى السلة قريباً",
                                ),
                              );
                            }}
                            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-container active:scale-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">
                {t("No products found", "لم يتم العثور على منتجات")}
              </p>
              <p className="text-sm mt-1">
                {t(
                  "Try adjusting your filters or search",
                  "حاول تعديل الفلاتر أو البحث",
                )}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-5 py-2 text-sm text-primary hover:bg-primary/5 rounded-xl transition-colors font-medium"
                >
                  {t("Clear All Filters", "مسح كل الفلاتر")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
