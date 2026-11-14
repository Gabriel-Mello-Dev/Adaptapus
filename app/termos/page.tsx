import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Clock, FileText, Mail, Scale, ShieldAlert } from "lucide-react";

import { Header, Footer } from "@/app/components";
import { EMAIL_CONTATO } from "@/app/institucional/siteInfo";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Conheça as condições de uso do Adaptapus, as regras de cadastro, o funcionamento das salas e do chat, os limites de cada plano e as responsabilidades do usuário.",
  alternates: {
    canonical: "/termos",
  },
};

export default function Termos() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-greenMain sm:text-5xl">
              Termos de Uso
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-greenMain/40" />
              <Brain size={28} className="text-greenMain" />
              <span className="h-px w-20 bg-greenMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              Estes termos descrevem as condições para usar o Adaptapus, uma
              plataforma educacional de apoio ao estudo. Ao criar uma conta ou
              utilizar a plataforma, o usuário declara que leu e concorda com
              estas condições.
            </p>

            <p className="mt-4 inline-flex items-center gap-2 text-sm text-blueMain/70">
              <Clock size={16} />
              Última atualização: 13 de novembro de 2026
            </p>
          </header>

          <div className="mx-auto mt-10 w-full max-w-3xl space-y-6 text-base leading-7 text-blueMain">
            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <FileText size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Aceitação dos termos
                </h2>
              </div>

              <p className="mt-5">
                O acesso e o uso do Adaptapus estão condicionados à aceitação
                destes Termos de Uso e da{" "}
                <Link
                  href="/privacidade"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  Política de Privacidade
                </Link>
                . Se o usuário não concordar com as condições, deve deixar de
                utilizar a plataforma. Menores de idade devem usar o Adaptapus
                com orientação de um responsável legal.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Brain size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  O que é o Adaptapus
                </h2>
              </div>

              <p className="mt-5">
                O Adaptapus é uma plataforma educacional que utiliza
                inteligência artificial para adaptar a contextualização de
                questões acadêmicas a temas de interesse do estudante. A
                proposta é aproximar o conteúdo dos interesses do aluno sem
                alterar o exercício original, seus dados e sua resposta
                correta.
              </p>

              <p className="mt-4">
                A plataforma também oferece salas de estudo colaborativas com
                chat, votação em questões adaptadas e acompanhamento de
                progresso por matéria. O serviço é fornecido no estado em que
                se encontra, conforme as funcionalidades disponíveis no
                momento do acesso.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <ShieldAlert size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Cadastro e conta
                </h2>
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-6">
                <li>
                  Para usar as áreas restritas, o usuário deve criar uma conta
                  informando nome, e-mail e senha.
                </li>
                <li>
                  O usuário é responsável pela veracidade das informações
                  fornecidas e pela segurança de sua senha.
                </li>
                <li>
                  A conta é pessoal. O usuário não deve compartilhar o acesso
                  com terceiros nem se passar por outra pessoa.
                </li>
                <li>
                  O uso da plataforma por menores deve ocorrer com orientação e
                  supervisão de um responsável legal.
                </li>
                <li>
                  Contas que violem estes termos ou as regras de convivência
                  podem ser desativadas, conforme descrito na seção sobre
                  salas, chat e moderação.
                </li>
              </ul>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <ShieldAlert size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Uso aceitável
                </h2>
              </div>

              <p className="mt-5">
                O Adaptapus deve ser usado para fins de estudo e apoio
                educacional. Não é permitido utilizar a plataforma para:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  enviar ou solicitar conteúdo ofensivo, sexual, violento,
                  discriminatório ou ilegal;
                </li>
                <li>
                  tentar burlar os filtros de conteúdo, os limites de plano ou
                  os mecanismos de segurança;
                </li>
                <li>
                  assediar, ameaçar ou prejudicar outros usuários nas salas e
                  no chat;
                </li>
                <li>
                  publicar conteúdo que viole direitos de terceiros, incluindo
                  direitos autorais e de imagem;
                </li>
                <li>
                  usar a plataforma para spam, fraude ou qualquer atividade
                  ilícita.
                </li>
              </ul>

              <p className="mt-4">
                A plataforma aplica filtros automáticos de termos nos temas e
                nos textos enviados para adaptação, além de manter canais para
                denúncia de questões e de conduta de usuários.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Brain size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Conteúdo gerado por inteligência artificial
                </h2>
              </div>

              <p className="mt-5">
                As questões adaptadas são produzidas por modelos de
                inteligência artificial a partir do enunciado e do tema
                informados pelo usuário. Apesar das instruções dadas ao modelo
                para preservar o exercício, os dados e a resposta correta, o
                resultado pode conter erros, imprecisões ou alterações
                indesejadas.
              </p>

              <p className="mt-4">
                A verificação de resposta compara a alternativa escolhida pelo
                estudante com a alternativa que a própria inteligência
                artificial indicou como correta. Por isso, tanto a adaptação
                quanto a correção devem ser revisadas pelo estudante, pelo
                professor ou pelo responsável.
              </p>

              <p className="mt-4">
                O Adaptapus é uma ferramenta de apoio ao estudo. Ele não
                substitui aulas, professores, materiais didáticos ou avaliações
                oficiais, e não há garantia de melhora de desempenho, nota ou
                aprovação em qualquer exame.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <ShieldAlert size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Salas, chat, denúncias e moderação
                </h2>
              </div>

              <p className="mt-5">
                As salas de estudo permitem que participantes conversem pelo
                chat e votem nas alternativas de uma questão adaptada. O
                criador da sala tem acesso ao painel de administração para
                escolher a matéria e a questão, informar o tema, gerar a
                adaptação, finalizar a votação e avançar para a próxima
                questão.
              </p>

              <p className="mt-4">
                Os participantes devem manter uma conduta respeitosa. Mensagens
                e questões podem ser denunciadas por outros usuários. As
                denúncias são analisadas no painel administrativo da
                plataforma, que pode marcar a denúncia como resolvida e
                desativar a conta de um usuário quando houver violação destes
                termos. A desativação impede o acesso à plataforma, e o usuário
                pode solicitar uma revisão pelo e-mail de contato.
              </p>

              <p className="mt-4">
                A moderação pode remover conteúdos ou restringir acessos para
                proteger os usuários e o funcionamento do serviço, sem
                prejuízo de outras medidas cabíveis.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Scale size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Planos e limites diários
                </h2>
              </div>

              <p className="mt-5">
                O Adaptapus possui planos com limites diários de adaptação de
                questões. Os limites atualmente praticados são:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold">Polvo Pigmeu:</strong> até
                  10 questões adaptadas por dia.
                </li>
                <li>
                  <strong className="font-semibold">Polvo Comum:</strong> até
                  50 questões adaptadas por dia.
                </li>
                <li>
                  <strong className="font-semibold">Kraken:</strong> questões
                  ilimitadas, sem limite diário.
                </li>
              </ul>

              <p className="mt-4">
                A contagem é feita por adaptação gerada pela API da plataforma.
                Ao atingir o limite do plano, novas adaptações ficam bloqueadas
                até a renovação diária ou até a alteração do plano. Os valores
                cobrados pelos planos, quando houver cobrança, não são
                definidos nestes termos e devem ser consultados na página de
                planos da plataforma.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <FileText size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Propriedade intelectual
                </h2>
              </div>

              <p className="mt-5">
                O nome Adaptapus, a identidade visual, os textos próprios e os
                elementos da plataforma pertencem aos seus respectivos
                titulares. O usuário não adquire propriedade sobre esses
                elementos pelo simples uso do serviço.
              </p>

              <p className="mt-4">
                As questões de exames oficiais, livros e outros materiais de
                terceiros pertencem aos seus respectivos titulares. O Adaptapus
                não reivindica a titularidade sobre esses enunciados. O usuário
                é responsável pelo conteúdo que envia e deve utilizá-lo apenas
                dentro do permitido pela legislação aplicável.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Scale size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Limitação de responsabilidade
                </h2>
              </div>

              <p className="mt-5">
                O Adaptapus é fornecido como ferramenta de apoio educacional.
                Na máxima extensão permitida pela legislação aplicável, a
                plataforma não se responsabiliza por decisões tomadas pelo
                usuário com base nas questões adaptadas, por erros ou omissões
                do conteúdo gerado por inteligência artificial, por
                indisponibilidades temporárias do serviço ou por condutas de
                terceiros nas salas e no chat.
              </p>

              <p className="mt-4">
                O usuário é responsável pelo uso que faz da plataforma e pelo
                conteúdo que envia. Nada nestes termos exclui direitos que a
                legislação brasileira garanta ao consumidor de forma
                indisponível.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Scale size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Legislação e foro
                </h2>
              </div>

              <p className="mt-5">
                Estes Termos de Uso são regidos pelas leis da República
                Federativa do Brasil, incluindo o Código de Defesa do
                Consumidor e a Lei Geral de Proteção de Dados Pessoais, quando
                aplicáveis. Eventuais controvérsias serão resolvidas conforme a
                legislação brasileira e o foro competente definido por lei.
              </p>

              <p className="mt-4">
                Caso alguma disposição destes termos seja considerada inválida,
                as demais permanecerão em vigor.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Mail size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Contato
                </h2>
              </div>

              <p className="mt-5">
                Dúvidas sobre estes termos podem ser enviadas para{" "}
                <a
                  href={`mailto:${EMAIL_CONTATO}`}
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  {EMAIL_CONTATO}
                </a>
                . Outras formas de contato estão descritas na página{" "}
                <Link
                  href="/fale-conosco"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  Fale conosco
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
