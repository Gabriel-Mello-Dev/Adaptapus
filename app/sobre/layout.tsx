import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o Adaptapus, plataforma de aprendizagem que usa inteligência artificial para adaptar questões aos interesses do estudante, e entenda a origem do projeto.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
