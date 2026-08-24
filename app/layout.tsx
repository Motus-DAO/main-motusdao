import type { Metadata } from "next";
import { Jura, Inter } from "next/font/google";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { messages } from "@/lib/messages";
import "./globals.css";

const heading = Jura({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const description = messages.es.answerBody;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Redes vivas de cuidado`,
    template: `%s · ${SITE_NAME}`,
  },
  description,
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Infraestructura para redes vivas de cuidado`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Redes vivas de cuidado`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* Motus Main Site is dark-first (operational DS). Light is opt-in. */
const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem('motus-theme');
    const light = stored === 'light';
    document.documentElement.classList.toggle('light', light);
    document.documentElement.classList.toggle('dark', !light);
    document.documentElement.style.colorScheme = light ? 'light' : 'dark';
  } catch (_) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <JsonLd />
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
