"use client"

import Link from "next/link";
import { Brain, BookOpen, Sparkles, Users, Target } from "lucide-react";

import { Header, Footer } from "@/app/components";

export default function Sobre() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="relative flex flex-1 flex-col overflow-hidden">
      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-10 pt-10 text-center">
        <h1 className="text-4xl font-bold text-greenMain sm:text-5xl">Sobre o Adaptapus</h1>

        <div className="my-3 flex items-center gap-4">
          <span className="h-px w-20 bg-greenMain/40" />

          <Brain size={28} className="text-greenMain" />

          <span className="h-px w-20 bg-greenMain/40" />
        </div>

        <h2 className="text-3xl font-bold text-blueMain">
          Aprender do seu jeito. Evoluir sempre.
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
          O Adaptapus é uma plataforma de aprendizagem adaptativa que utiliza
          inteligência artificial para personalizar conteúdos didáticos e
          questões de acordo com os interesses dos estudantes.
        </p>
      </section>

      {/* O que é */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-8">
        <div className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-greenMain/10 p-3">
              <BookOpen size={28} className="text-greenMain" />
            </div>

            <h2 className="text-2xl font-bold text-blueMain">
              O que é o Adaptapus?
            </h2>
          </div>

          <p className="mt-5 text-base leading-7 text-blueMain/80">
            O Adaptapus foi desenvolvido com o objetivo de tornar o processo de
            aprendizagem mais personalizado e contextualizado. A plataforma
            permite que o estudante utilize seus próprios interesses como
            referência para adaptar conteúdos educacionais.
          </p>

          <p className="mt-4 text-base leading-7 text-blueMain/80">
            Dessa forma, assuntos escolares podem ser apresentados por meio de
            exemplos, situações e contextos relacionados aos temas que fazem
            parte do interesse de cada estudante.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white/80 p-7 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-orange-500/10 p-3">
                <Sparkles size={26} className="text-orange-500" />
              </div>

              <h2 className="text-xl font-bold text-blueMain">
                Aprendizagem adaptativa
              </h2>
            </div>

            <p className="leading-7 text-blueMain/80">
              O estudante informa seus interesses e a inteligência artificial
              utiliza essas informações para adaptar a contextualização dos
              conteúdos e das questões, mantendo o objetivo educacional da
              atividade.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 p-7 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-blueMain/10 p-3">
                <Target size={26} className="text-blueMain" />
              </div>

              <h2 className="text-xl font-bold text-blueMain">
                Estudo personalizado
              </h2>
            </div>

            <p className="leading-7 text-blueMain/80">
              A proposta é aproximar os conteúdos escolares da realidade e dos
              interesses dos estudantes, tornando o estudo mais contextualizado,
              acessível e envolvente.
            </p>
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-8">
        <div className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-greenMain/10 p-3">
              <Users size={28} className="text-greenMain" />
            </div>

            <h2 className="text-2xl font-bold text-blueMain">
              Para quem é o Adaptapus?
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Estudantes",
              "Professores",
              "Educadores",
              "Escolas",
              "Projetos educacionais",
              "Pessoas interessadas em IA na educação",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-blueMain/5 px-5 py-4 text-center font-medium text-blueMain"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origem do projeto */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-8">
        <div className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-greenMain/10 p-3">
              <BookOpen size={28} className="text-greenMain" />
            </div>

            <h2 className="text-2xl font-bold text-blueMain">
              Origem do projeto
            </h2>
          </div>

          <p className="mt-5 text-base leading-7 text-blueMain/80">
            O Adaptapus está sendo desenvolvido como projeto de Trabalho de
            Conclusão de Curso de Desenvolvimento de Sistemas. A proposta é
            usar tecnologia e inteligência artificial como ferramentas de apoio
            à aprendizagem personalizada.
          </p>

          <p className="mt-4 text-base leading-7 text-blueMain/80">
            O projeto investiga se a adaptação da contextualização das questões
            pode contribuir para aumentar o interesse e o engajamento dos
            estudantes durante os estudos. Para conhecer o funcionamento da
            plataforma, acesse{" "}
            <Link
              href="/como-funciona"
              className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
            >
              Como funciona
            </Link>
            . Dúvidas e sugestões podem ser enviadas em{" "}
            <Link
              href="/fale-conosco"
              className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
            >
              Fale conosco
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Diferencial */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="rounded-3xl bg-blueMain p-8 text-center shadow-xl">
          <Brain size={36} className="mx-auto text-greenMain" />

          <h2 className="mt-4 text-2xl font-bold text-white">
            Conteúdo que se adapta a você
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-white/80">
            O Adaptapus busca unir inteligência artificial, aprendizagem
            adaptativa e personalização educacional para criar uma experiência
            de estudo mais próxima dos interesses de cada estudante.
          </p>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
