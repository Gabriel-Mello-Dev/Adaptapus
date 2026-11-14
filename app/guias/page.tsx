import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Lightbulb } from "lucide-react";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { guias } from "./conteudo";

export const metadata: Metadata = {
  title: "Guias de estudo",
  description:
    "Artigos originais sobre contextualização, uso de interesses no estudo, exemplos do dia a dia, inteligência artificial e revisão de questões adaptadas.",
  alternates: {
    canonical: "/guias",
  },
};

export default function Guias() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-greenMain sm:text-5xl">
              Guias de estudo
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-greenMain/40" />
              <Brain size={28} className="text-greenMain" />
              <span className="h-px w-20 bg-greenMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              Artigos escritos para ajudar você a estudar com mais consciência:
              o papel do contexto, o uso de interesses pessoais, exemplos do
              cotidiano, inteligência artificial e revisão de questões
              adaptadas.
            </p>
          </header>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {guias.map((guia) => (
              <article
                key={guia.slug}
                className="flex flex-col rounded-3xl bg-white/80 p-7 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-greenMain/10 p-3">
                    <BookOpen size={26} className="text-greenMain" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-blueMain/60">
                    Guia de estudo
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-blueMain">
                  {guia.titulo}
                </h2>

                <p className="mt-3 flex-1 text-base leading-7 text-blueMain/80">
                  {guia.resumo}
                </p>

                <Link
                  href={`/guias/${guia.slug}`}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-greenMain transition hover:text-orangeMain"
                >
                  Ler artigo
                  <ArrowRight size={18} />
                </Link>
              </article>
            ))}
          </div>

          <section className="mt-8 rounded-3xl bg-blueMain p-8 text-center shadow-xl">
            <div className="mx-auto flex w-fit rounded-2xl bg-white/10 p-3">
              <Lightbulb size={28} className="text-orangeSecond" />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Coloque as ideias em prática
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
              Entenda o passo a passo do Adaptapus e veja exemplos de questões
              adaptadas nas três matérias disponíveis.
            </p>

            <div className="mt-6 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <Link
                href="/como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-greenMain px-6 py-3 font-semibold text-white transition hover:bg-greenMain/85"
              >
                Como funciona
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/exemplos"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orangeMain px-6 py-3 font-semibold text-white transition hover:bg-orangeSecond"
              >
                Ver exemplos
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
