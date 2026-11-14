import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  BookOpenCheck,
  CircleHelp,
  Lightbulb,
  ListChecks,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

import { Header, Footer } from "@/app/components";

export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "Entenda o passo a passo do Adaptapus: como a inteligência artificial adapta questões, como funcionam as salas colaborativas, os planos e os limites de uso.",
  alternates: {
    canonical: "/como-funciona",
  },
};

const passos = [
  {
    titulo: "Escolha a matéria",
    texto:
      "No fluxo individual da página Adaptar, a matéria enviada à inteligência artificial é Matemática. Nas salas de estudo, o administrador escolhe entre as matérias disponíveis nos arquivos públicos da plataforma: Matemática, Física e Química.",
  },
  {
    titulo: "Informe a questão e o tema",
    texto:
      "O estudante cola o enunciado da questão e escreve um tema de interesse, como jogos, esportes, música, culinária ou tecnologia. O tema precisa ser compatível com as regras de segurança da plataforma.",
  },
  {
    titulo: "A IA adapta o contexto",
    texto:
      "A inteligência artificial reescreve a situação apresentada para que ela aconteça dentro do tema, mantendo o mesmo exercício: a lógica, os dados, as alternativas e a resposta correta devem ser preservados.",
  },
  {
    titulo: "Resolva a questão",
    texto:
      "A questão adaptada aparece com suas alternativas. O estudante escolhe uma resposta e confirma o envio. A plataforma compara a escolha com a alternativa que a IA indicou como correta e registra o resultado no progresso da matéria.",
  },
  {
    titulo: "Revise o resultado",
    texto:
      "O resultado serve como apoio ao estudo, não como correção definitiva. Como a adaptação e o gabarito vêm de um modelo de IA, o estudante deve conferir o enunciado, os dados e a resolução com seu material ou com um professor.",
  },
];

export default function ComoFunciona() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-orangeMain sm:text-5xl">
              Como funciona o Adaptapus
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-orangeMain/40" />
              <Brain size={28} className="text-orangeMain" />
              <span className="h-px w-20 bg-orangeMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              O Adaptapus usa inteligência artificial para mudar o contexto de
              uma questão sem mudar o exercício. Esta página explica o fluxo
              completo, o que a plataforma faz e quais são os seus limites.
            </p>
          </header>

          <div className="mt-10 space-y-6">
            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Users size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Para quem é
                </h2>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                O Adaptapus foi pensado para estudantes que querem aproximar o
                conteúdo escolar dos seus interesses, para professores que
                desejam criar variações contextualizadas de exercícios e para
                pessoas que acompanham o estudo de alguém, como responsáveis e
                educadores. A plataforma é uma ferramenta de apoio: ela não
                substitui a explicação do professor nem o material didático.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <ListChecks size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Passo a passo
                </h2>
              </div>

              <ol className="mt-6 space-y-4">
                {passos.map((passo, index) => (
                  <li
                    key={passo.titulo}
                    className="rounded-2xl bg-blueMain/5 p-5"
                  >
                    <h3 className="flex items-center gap-3 text-lg font-bold text-blueMain">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orangeMain text-sm text-white">
                        {index + 1}
                      </span>
                      {passo.titulo}
                    </h3>
                    <p className="mt-2 pl-11 text-base leading-7 text-blueMain/80">
                      {passo.texto}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <BookOpenCheck size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Modo ENEM e modo livre
                </h2>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-blueMain/5 p-5">
                  <h3 className="text-lg font-bold text-blueMain">
                    Modo ENEM
                  </h3>
                  <p className="mt-2 text-base leading-7 text-blueMain/80">
                    Usado nas salas de estudo quando o administrador adapta uma
                    questão do banco da plataforma. As cinco alternativas
                    originais são preservadas na mesma ordem, assim como a
                    posição da resposta correta. A IA deve mudar apenas o
                    contexto narrativo, mantendo o raciocínio e os dados.
                  </p>
                </div>

                <div className="rounded-2xl bg-blueMain/5 p-5">
                  <h3 className="text-lg font-bold text-blueMain">
                    Modo livre
                  </h3>
                  <p className="mt-2 text-base leading-7 text-blueMain/80">
                    Usado na página Adaptar. A IA pode criar a quantidade de
                    alternativas que fizer sentido para a questão, com no
                    mínimo duas. A resposta correta deve ser exatamente uma das
                    alternativas criadas, e as demais devem estar incorretas.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                Em qualquer modo, as instruções enviadas ao modelo determinam
                que os números, unidades, fórmulas e condições necessárias
                sejam preservados. O modelo também recebe regras de segurança
                para recusar temas com conteúdo sexual, vulgar ou
                discriminatório.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Users size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Salas de estudo colaborativas
                </h2>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                Além do estudo individual, o Adaptapus permite criar uma sala e
                convidar outras pessoas por meio de um código. Quem cria a sala
                recebe o painel de administração, onde escolhe a matéria e a
                questão do banco disponível, informa o tema e gera a adaptação.
              </p>

              <p className="mt-4 text-base leading-7 text-blueMain/80">
                Os participantes conversam pelo chat, votam em uma alternativa
                e acompanham os votos. O administrador finaliza a votação, a
                plataforma mostra quantas pessoas acertaram e erraram e, em
                seguida, ele pode avançar para a próxima questão. Mensagens e
                questões podem ser denunciadas para análise no painel
                administrativo do Adaptapus.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Sparkles size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Planos e limites diários
                </h2>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                O Adaptapus possui três planos com limites diferentes de
                adaptações por dia:
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-greenMain/10 px-5 py-4 text-center">
                  <h3 className="font-bold text-blueMain">Polvo Pigmeu</h3>
                  <p className="mt-1 text-sm text-blueMain/80">
                    10 questões por dia
                  </p>
                </div>
                <div className="rounded-2xl bg-orangeMain/10 px-5 py-4 text-center">
                  <h3 className="font-bold text-blueMain">Polvo Comum</h3>
                  <p className="mt-1 text-sm text-blueMain/80">
                    50 questões por dia
                  </p>
                </div>
                <div className="rounded-2xl bg-blueMain/10 px-5 py-4 text-center">
                  <h3 className="font-bold text-blueMain">Kraken</h3>
                  <p className="mt-1 text-sm text-blueMain/80">
                    Questões ilimitadas
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                A contagem é feita por adaptação gerada pela API. Ao atingir o
                limite do plano, novas adaptações ficam bloqueadas até a
                renovação diária ou a alteração do plano. O plano atual e o
                limite podem ser consultados na página de planos.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <ShieldAlert size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Uso de IA e limitações
                </h2>
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-7 text-blueMain/80">
                <li>
                  A IA pode errar. Ela pode alterar um dado sem perceber,
                  cambiar uma unidade, criar um contexto implausível ou indicar
                  uma resposta incorreta.
                </li>
                <li>
                  A correção também depende da IA. A plataforma compara a
                  alternativa escolhida com o índice que o modelo informou como
                  correto, e não com um gabarito oficial externo.
                </li>
                <li>
                  O estudante deve revisar a questão adaptada antes de tratá-la
                  como material confiável, conferindo o enunciado, os dados e a
                  resolução.
                </li>
                <li>
                  Existe um filtro automático de termos no tema e no texto
                  enviado, além de filtro na resposta gerada. Ainda assim,
                  nenhum filtro é infalível.
                </li>
                <li>
                  Mensagens e questões podem ser denunciadas para análise e
                  moderação.
                </li>
              </ul>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <CircleHelp size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  O que a plataforma não faz
                </h2>
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-7 text-blueMain/80">
                <li>não substitui aulas, professores ou materiais didáticos;</li>
                <li>
                  não garante que a questão adaptada esteja correta nem que a
                  resposta indicada seja a oficial;
                </li>
                <li>
                  não garante melhora de nota, aprovação ou desempenho em
                  exames;
                </li>
                <li>
                  não cria um gabarito oficial de exames como o ENEM nem se
                  vincula a órgãos públicos;
                </li>
                <li>
                  não impede totalmente que um conteúdo inadequado passe pelos
                  filtros.
                </li>
              </ul>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Lightbulb size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Exemplo de antes e depois
                </h2>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-blueMain/10 bg-blueMain/5 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-blueMain/60">
                    Questão original
                  </h3>
                  <p className="mt-3 text-base leading-7 text-blueMain">
                    Uma loja vende camisetas a R$ 45,00 cada. Um cliente compra
                    3 camisetas e usa um cupom de desconto de R$ 20,00. Quanto
                    o cliente paga?
                  </p>
                  <p className="mt-3 text-sm leading-6 text-blueMain/70">
                    Resolução: 3 × 45 = 135; 135 − 20 = 115. Resposta: R$
                    115,00.
                  </p>
                </div>

                <div className="rounded-2xl border border-greenMain/20 bg-greenMain/5 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-greenMain">
                    Versão adaptada ao tema “jogos”
                  </h3>
                  <p className="mt-3 text-base leading-7 text-blueMain">
                    Em um jogo on-line, cada skin custa 45 moedas. Um jogador
                    compra 3 skins e utiliza um cupom de 20 moedas. Quantas
                    moedas ele paga?
                  </p>
                  <p className="mt-3 text-sm leading-6 text-blueMain/70">
                    Resolução: 3 × 45 = 135; 135 − 20 = 115. Resposta: 115
                    moedas.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain/80">
                O contexto mudou, mas o exercício continua o mesmo: uma
                multiplicação seguida de subtração, com os mesmos valores e o
                mesmo resultado.
              </p>
            </section>

            <section className="rounded-3xl bg-blueMain p-8 text-center shadow-xl">
              <h2 className="text-2xl font-bold text-white">
                Continue explorando
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
                Veja exemplos em outras matérias, leia os guias de estudo ou
                abra a página de adaptação para testar o fluxo.
              </p>

              <div className="mt-6 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
                <Link
                  href="/exemplos"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-greenMain px-6 py-3 font-semibold text-white transition hover:bg-greenMain/85"
                >
                  Ver exemplos
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/guias"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orangeMain px-6 py-3 font-semibold text-white transition hover:bg-orangeSecond"
                >
                  Ler os guias
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/pages/Adaptar"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-whiteMain px-6 py-3 font-semibold text-blueMain transition hover:bg-whiteSecond"
                >
                  Adaptar uma questão
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
