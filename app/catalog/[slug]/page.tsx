"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Cpu,
  Star,
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Package,
  Gauge,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
  CircuitBoard,
} from "lucide-react";
import { toast } from "sonner";

// Import the same product list from catalog (or define separately)
// For simplicity, we'll define the products here; in a real app you'd import from a shared file.
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
  // Add other products as needed; for brevity, we include only a few, but you can copy the rest from catalog page.
  // ... (rest of the products)
];

// Generate a slug from product name
const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Create a map from slug to product
const productMap: Record<string, Product> = {};
allProducts.forEach((p) => {
  const slug = slugify(p.name);
  // Handle duplicates by appending id if needed
  if (productMap[slug]) {
    productMap[`${slug}-${p.id}`] = p;
  } else {
    productMap[slug] = p;
  }
});

// Helper to get category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "CPUs":
      return <Cpu className="w-5 h-5" />;
    case "GPUs":
      return <Cpu className="w-5 h-5" />;
    case "Motherboards":
      return <CircuitBoard className="w-5 h-5" />;
    case "RAM":
      return <MemoryStick className="w-5 h-5" />;
    case "Storage":
      return <HardDrive className="w-5 h-5" />;
    case "PSUs":
      return <Zap className="w-5 h-5" />;
    case "Cases":
      return <Box className="w-5 h-5" />;
    case "Cooling":
      return <Fan className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

const ProductDetailPage = () => {
  const { t, lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;

  // Find product by slug
  const product = productMap[slug];

  // If product not found, show 404-like message
  if (!product) {
    return (
      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-muted-foreground/40" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {t("Product Not Found", "المنتج غير موجود")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t(
              "The product you're looking for doesn't exist or has been removed.",
              "المنتج الذي تبحث عنه غير موجود أو تمت إزالته.",
            )}
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary-container transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Catalog", "العودة إلى الكتالوج")}
          </Link>
        </div>
      </div>
    );
  }

  // Add to builder: navigate to builder with product ID and category
  const addToBuilder = () => {
    // Determine the component key (category mapping)
    const categoryMap: Record<string, string> = {
      CPUs: "cpu",
      GPUs: "gpu",
      Motherboards: "motherboard",
      RAM: "ram",
      Storage: "storage",
      PSUs: "psu",
      Cases: "case",
      Cooling: "cooling",
    };
    const componentKey = categoryMap[product.category];
    if (!componentKey) {
      toast.error(
        t(
          "Cannot add this component type",
          "لا يمكن إضافة هذا النوع من المكونات",
        ),
      );
      return;
    }

    // Save to localStorage? Or navigate with query param to pre-select?
    // We'll navigate to builder with query param for the product id.
    // The builder page already reads from localStorage builds, but we need to pre-select a single component.
    // Alternative: store a "tempSelection" in localStorage and clear after use.
    // For simplicity, we'll store in sessionStorage and navigate.
    const tempSelections = JSON.parse(
      sessionStorage.getItem("shm-temp-selections") || "{}",
    );
    tempSelections[componentKey] = product;
    sessionStorage.setItem(
      "shm-temp-selections",
      JSON.stringify(tempSelections),
    );
    window.location.href = `/Pc-Builder?temp=${Date.now()}`; // hard navigation to avoid losing state
  };

  return (
    <div className="container py-6 lg:py-10">
      {/* Breadcrumb */}
      <ScrollReveal>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link
            href="/catalog"
            className="hover:text-primary transition-colors"
          >
            {t("Catalog", "الكتالوج")}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <ScrollReveal animation="slide-left">
          <div className="aspect-square bg-card rounded-2xl shadow-elevation-2 flex items-center justify-center p-8">
            <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center">
              <Cpu className="w-32 h-32 text-muted-foreground/30" />
            </div>
          </div>
        </ScrollReveal>

        {/* Product Info */}
        <ScrollReveal animation="slide-right">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.brand}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-card px-3 py-1.5 rounded-full shadow-elevation-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-semibold tabular-nums">
                  {product.rating}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold tabular-nums">
                ${product.price}
              </span>
              {!product.inStock && (
                <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                  {t("Out of Stock", "غير متوفر")}
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="space-y-3 mb-6">
              {product.specs && (
                <div className="flex items-start gap-2 text-sm">
                  <Gauge className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">
                      {t("Specs", "المواصفات")}:
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {product.specs}
                    </span>
                  </div>
                </div>
              )}
              {product.socket && (
                <div className="flex items-start gap-2 text-sm">
                  <Cpu className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">
                      {t("Socket", "المقبس")}:
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {product.socket}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">
                  {t("Description", "الوصف")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                disabled={!product.inStock}
                onClick={addToBuilder}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-container active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                {t("Add to Builder", "أضف إلى المُنشئ")}
              </button>
              <Link
                href="/Pc-Builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted active:scale-[0.97] transition-all"
              >
                {t("Go to Builder", "اذهب إلى المُنشئ")}
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>

            {!product.inStock && (
              <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {t(
                  "This product is currently out of stock. Check back later!",
                  "هذا المنتج غير متوفر حالياً. تحقق لاحقاً!",
                )}
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Related Products (optional) */}
      <ScrollReveal>
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">
            {t("Related Products", "منتجات مشابهة")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allProducts
              .filter(
                (p) => p.category === product.category && p.id !== product.id,
              )
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/catalog/${slugify(related.name)}`}
                  className="group bg-card rounded-xl p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow"
                >
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                    {getCategoryIcon(related.category)}
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">
                    {related.brand}
                  </span>
                  <h3 className="font-semibold text-sm mt-0.5 line-clamp-2">
                    {related.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm tabular-nums">
                      ${related.price}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {related.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ProductDetailPage;
