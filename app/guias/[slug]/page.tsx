import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

import { Header, Footer } from "@/app/components";
import { buscarGuia, guias } from "../conteudo";

type GuiaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guias.map((guia) => ({ slug: guia.slug }));
}

export async function generateMetadata({
  params,
}: GuiaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guia = buscarGuia(slug);

  if (!guia) {
    return {};
  }

  return {
    title: guia.titulo,
    description: guia.resumo,
    alternates: {
      canonical: `/guias/${guia.slug}`,
    },
  };
}

export default async function Guia({ params }: GuiaPageProps) {
  const { slug } = await params;
  const guia = buscarGuia(slug);

  if (!guia) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <Link
              href="/guias"
              className="inline-flex items-center gap-2 text-sm font-semibold text-greenMain transition hover:text-orangeMain"
            >
              <ArrowLeft size={16} />
              Voltar para os guias
            </Link>

            <h1 className="mt-5 text-4xl font-bold text-greenMain sm:text-5xl">
              {guia.titulo}
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-greenMain/40" />
              <Brain size={28} className="text-greenMain" />
              <span className="h-px w-20 bg-greenMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              {guia.resumo}
            </p>
          </header>

          <article className="mx-auto mt-10 w-full max-w-3xl rounded-3xl bg-white/80 p-6 text-base leading-7 text-blueMain shadow-xl backdrop-blur-sm sm:p-8">
            {guia.corpo.map((bloco, index) =>
              bloco.tipo === "subtitulo" ? (
                <h2
                  key={`${bloco.tipo}-${index}`}
                  className="mt-8 text-2xl font-bold text-blueMain first:mt-0"
                >
                  {bloco.texto}
                </h2>
              ) : (
                <p
                  key={`${bloco.tipo}-${index}`}
                  className="mt-4 text-base leading-7 text-blueMain/85"
                >
                  {bloco.texto}
                </p>
              ),
            )}

            <div className="mt-8 rounded-2xl bg-greenMain/10 p-5">
              <p className="text-base leading-7 text-blueMain">
                Quer ver essas ideias aplicadas? Conheça a página{" "}
                <Link
                  href="/como-funciona"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  Como funciona
                </Link>{" "}
                e entenda o passo a passo da adaptação de questões.
              </p>
            </div>
          </article>

          <div className="mx-auto mt-6 w-full max-w-3xl">
            <Link
              href="/guias"
              className="inline-flex items-center gap-2 rounded-xl bg-greenMain px-5 py-3 font-semibold text-white transition hover:bg-greenMain/85"
            >
              <ArrowLeft size={18} />
              Ver todos os guias
            </Link>

            <Link
              href="/exemplos"
              className="ml-3 inline-flex items-center gap-2 rounded-xl border border-greenMain/30 px-5 py-3 font-semibold text-greenMain transition hover:bg-greenMain/10"
            >
              Ver exemplos
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
