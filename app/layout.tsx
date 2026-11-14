
import type { Metadata } from "next";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import { URL_SITE } from "@/app/institucional/siteInfo";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: "Adaptapus",
    template: "%s | Adaptapus",
  },
  description:
    "Adaptador de questões didáticas para temas de seu interesse utilizando Inteligência Artificial",
  openGraph: {
    siteName: "Adaptapus",
    locale: "pt_BR",
    type: "website",
    images: ["/imgs/logoAdaptapus.png"],
  },
  twitter: {
    card: "summary",
    title: "Adaptapus",
    description:
      "Adaptador de questões didáticas para temas de seu interesse utilizando Inteligência Artificial",
    images: ["/imgs/logoAdaptapus.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9026010681860906"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
