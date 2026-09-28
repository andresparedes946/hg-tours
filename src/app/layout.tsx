import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

// URL base para metadatos: dominio definitivo, o la de producción de Vercel, o local.
const baseUrl =
  site.url ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = `${site.name} — Traslados, turismo y viajes en Mercedes-Benz Sprinter`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description: site.description,
  applicationName: site.name,
  // Canonical solo con el dominio definitivo confirmado.
  ...(site.url ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

// Antes de pintar: si el preloader ya se vio en esta sesión (o el usuario
// prefiere menos movimiento) se oculta para no mostrarlo otra vez.
const introScript = `try{if(sessionStorage.getItem("hg-intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("no-intro")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
