import type { Metadata } from "next";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Adaptapus",
  description:
    "Adaptador de questões didaticas para temas de seu interesse utilizando Inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
