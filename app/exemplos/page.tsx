import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, FlaskConical, Lightbulb, Sigma } from "lucide-react";

import { Header, Footer } from "@/app/components";

export const metadata: Metadata = {
  title: "Exemplos de questões adaptadas",
  description:
    "Veja exemplos originais de como uma questão de Matemática, Física ou Química pode mudar de contexto sem mudar o exercício, os dados e a resposta correta.",
  alternates: {
    canonical: "/exemplos",
  },
};

const exemplos = [
  {
    materia: "Matemática",
    icone: <Sigma size={28} className="text-greenMain" />,
    original:
      "Uma loja vende camisetas a R$ 45,00 cada. Um cliente compra 3 camisetas e usa um cupom de desconto de R$ 20,00. Quanto o cliente paga?",
    tema: "Jogos on-line",
    adaptada:
      "Em um jogo on-line, cada skin custa 45 moedas. Um jogador compra 3 skins e utiliza um cupom de 20 moedas. Quantas moedas ele paga?",
    preservado:
      "O conceito de multiplicar o preço unitário pela quantidade e depois subtrair um desconto. Os valores (45, 3 e 20), a estrutura do problema e o resultado (115) continuam iguais.",
    resolucao: "3 × 45 = 135. Depois, 135 − 20 = 115. Resposta: 115 moedas.",
  },
  {
    materia: "Física",
    icone: <Brain size={28} className="text-greenMain" />,
    original:
      "Um carro percorre 150 km em 2 horas. Qual é a velocidade média do carro nesse percurso?",
    tema: "Turnê musical",
    adaptada:
      "Uma banda viaja de uma cidade a outra em uma turnê. O trajeto tem 150 km e dura 2 horas. Qual é a velocidade média da viagem?",
    preservado:
      "O conceito de velocidade média como distância dividida pelo tempo. A distância (150 km), o tempo (2 h), a operação e o resultado (75 km/h) permanecem iguais.",
    resolucao: "150 ÷ 2 = 75. Resposta: 75 km/h.",
  },
  {
    materia: "Química",
    icone: <FlaskConical size={28} className="text-greenMain" />,
    original:
      "Uma solução é preparada dissolvendo 20 g de sal em 500 mL de água. Qual é a concentração da solução em gramas por litro (g/L)?",
    tema: "Culinária",
    adaptada:
      "Para preparar uma salmoura, um cozinheiro dissolve 20 g de sal em 500 mL de água. Qual é a concentração da salmoura em gramas por litro (g/L)?",
    preservado:
      "O conceito de concentração em massa por volume. A massa (20 g), o volume (500 mL, ou 0,5 L), a conversão de unidade e o resultado (40 g/L) continuam iguais.",
    resolucao:
      "500 mL = 0,5 L. Depois, 20 ÷ 0,5 = 40. Resposta: 40 g/L.",
  },
];

export default function Exemplos() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-orangeMain sm:text-5xl">
              Exemplos de questões adaptadas
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-orangeMain/40" />
              <Brain size={28} className="text-orangeMain" />
              <span className="h-px w-20 bg-orangeMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              Os exemplos abaixo foram escritos para esta página e usam
              situações inventadas. Eles não foram copiados de provas oficiais
              nem de livros, e também não são o resultado de uma execução
              registrada da ferramenta: servem para ilustrar o tipo de
              transformação que o Adaptapus se propõe a fazer.
            </p>
          </header>

          <div className="mt-10 space-y-6">
            {exemplos.map((exemplo) => (
              <section
                key={exemplo.materia}
                className="rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-greenMain/10 p-3">
                    {exemplo.icone}
                  </div>
                  <h2 className="text-2xl font-bold text-blueMain">
                    {exemplo.materia}
                  </h2>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl border border-blueMain/10 bg-blueMain/5 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-blueMain/60">
                      Enunciado original
                    </h3>
                    <p className="mt-3 text-base leading-7 text-blueMain">
                      {exemplo.original}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-greenMain/20 bg-greenMain/5 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-greenMain">
                      Versão adaptada ao tema “{exemplo.tema}”
                    </h3>
                    <p className="mt-3 text-base leading-7 text-blueMain">
                      {exemplo.adaptada}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-orangeMain/10 p-5">
                    <h3 className="text-base font-bold text-blueMain">
                      O que foi preservado
                    </h3>
                    <p className="mt-2 text-base leading-7 text-blueMain/80">
                      {exemplo.preservado}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blueMain/5 p-5">
                    <h3 className="text-base font-bold text-blueMain">
                      Resolução curta
                    </h3>
                    <p className="mt-2 text-base leading-7 text-blueMain/80">
                      {exemplo.resolucao}
                    </p>
                  </div>
                </div>
              </section>
            ))}

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Lightbulb size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  O que observar em uma adaptação
                </h2>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                Ao revisar uma questão adaptada, confira se os dados numéricos e
                as unidades continuam fazendo sentido dentro do novo contexto,
                se o problema pede a mesma operação e se a resposta indicada
                corresponde ao cálculo. Uma adaptação bonita, mas com um dado
                trocado, não preserva o exercício.
              </p>

              <p className="mt-4 text-base leading-7 text-blueMain/80">
                Esse cuidado é necessário porque a adaptação é feita por
                inteligência artificial. A plataforma orienta o modelo a
                preservar o exercício, mas a revisão humana continua sendo
                parte do processo de estudo.
              </p>
            </section>

            <section className="rounded-3xl bg-blueMain p-8 text-center shadow-xl">
              <h2 className="text-2xl font-bold text-white">
                Quer entender o processo completo?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
                A página Como funciona explica o passo a passo, os modos de
                adaptação, as salas colaborativas e os limites de cada plano.
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
                  href="/guias"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orangeMain px-6 py-3 font-semibold text-white transition hover:bg-orangeSecond"
                >
                  Ler os guias
                  <ArrowRight size={18} />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
