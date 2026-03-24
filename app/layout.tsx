import { Providers } from "./providers";
import Layout from "../components/Layout";
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
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
