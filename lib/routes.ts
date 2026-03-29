// lib/routes.ts
export type RouteConfig = {
    key: string;
    path: string;
    en: string;
    ar: string;
    icon?: React.ComponentType<{ className?: string }>;
};

export const ROUTES: RouteConfig[] = [
    { key: "HOME", path: "/", en: "Home", ar: "الرئيسية" },
    { key: "CATALOG", path: "/catalog", en: "Catalog", ar: "المتجر" },
    { key: "PC_BUILDER", path: "/pc-builder", en: "PC Builder", ar: "بناء الكمبيوتر" },
    { key: "SAVED_BUILDS", path: "/Saved-builds", en: "Saved Builds", ar: "التجميعات المحفوظة" },
    { key: "CONTACT", path: "/Contact", en: "Contact", ar: "تواصل معنا" },
];

// Named exports for direct access
export const HOME = ROUTES[0];
export const CATALOG = ROUTES[1];
export const PC_BUILDER = ROUTES[2];
export const SAVED_BUILDS = ROUTES[3];
export const CONTACT = ROUTES[4];

// Dynamic route patterns
export const DYNAMIC_ROUTES = {
    PRODUCT_DETAIL: (slug: string) => `/catalog/${slug}`,
};

// Helper for active route check
export const isActiveRoute = (pathname: string, routePath: string) => {
    if (routePath === "/") return pathname === "/";
    return pathname.startsWith(routePath);
};

// Helper to get route by path
export const getRouteByPath = (path: string) => {
    return ROUTES.find((r) => r.path === path);
};