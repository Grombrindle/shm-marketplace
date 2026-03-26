import { inter, tajawal } from "./fonts";
import { Providers } from "./providers";
import Layout from "@/components/Layout";
import "./globals.css";

export const metadata = {
  title: "SHM - Syrian Hardware Marketplace",
  description: "Build your PC with local market prices and assembly services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {/* LanguageSetter REMOVED to prevent conflict */}
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
