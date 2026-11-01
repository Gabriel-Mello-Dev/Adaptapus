
import type { Metadata } from "next";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Adaptapus",
  description:
    "Adaptador de questões didáticas para temas de seu interesse utilizando Inteligência Artificial",
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
