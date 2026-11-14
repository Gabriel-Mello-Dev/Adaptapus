import Link from "next/link";
import { ArrowLeft, Brain, Compass, LifeBuoy, TriangleAlert } from "lucide-react";

import { Header, Footer } from "@/app/components";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-2xl rounded-3xl bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <div className="mx-auto flex w-fit rounded-2xl bg-orangeMain/10 p-4">
            <TriangleAlert size={36} className="text-orangeMain" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-wide text-orangeMain">
            Erro 404
          </p>

          <h1 className="mt-2 text-4xl font-bold text-blueMain sm:text-5xl">
            Página não encontrada
          </h1>

          <div className="my-4 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-greenMain/40" />
            <Brain size={26} className="text-greenMain" />
            <span className="h-px w-20 bg-greenMain/40" />
          </div>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blueMain/80">
            O endereço que você tentou abrir não existe ou foi movido. Confira
            o link e tente novamente, ou volte para uma das páginas abaixo.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-greenMain px-5 py-3 font-semibold text-white transition hover:bg-greenMain/85"
            >
              <ArrowLeft size={18} />
              Voltar para a Home
            </Link>

            <Link
              href="/como-funciona"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-greenMain/30 px-5 py-3 font-semibold text-greenMain transition hover:bg-greenMain/10"
            >
              <Compass size={18} />
              Como funciona
            </Link>

            <Link
              href="/fale-conosco"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blueMain/20 px-5 py-3 font-semibold text-blueMain transition hover:bg-blueMain/5"
            >
              <LifeBuoy size={18} />
              Fale conosco
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
