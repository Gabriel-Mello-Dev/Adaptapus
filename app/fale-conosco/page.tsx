import type { Metadata } from "next";
import Link from "next/link";
import { Brain, HelpCircle, Mail, MessageSquare, ShieldCheck } from "lucide-react";

import { Header, Footer } from "@/app/components";
import {
  EMAIL_CONTATO,
  NOME_RESPONSAVEL,
} from "@/app/institucional/siteInfo";

export const metadata: Metadata = {
  title: "Fale conosco",
  description:
    "Entre em contato com o Adaptapus para tirar dúvidas, pedir suporte, tratar de privacidade, denunciar conteúdo ou enviar sugestões.",
  alternates: {
    canonical: "/fale-conosco",
  },
};

export default function FaleConosco() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-greenMain sm:text-5xl">
              Fale conosco
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-greenMain/40" />
              <Brain size={28} className="text-greenMain" />
              <span className="h-px w-20 bg-greenMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              O canal de contato do Adaptapus é o e-mail. Não existe formulário
              nesta página e nenhuma mensagem é enviada automaticamente: ao
              clicar no endereço abaixo, seu aplicativo de e-mail será aberto
              para que você escreva a mensagem.
            </p>
          </header>

          <div className="mx-auto mt-10 w-full max-w-3xl space-y-6">
            <section className="rounded-3xl bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm">
              <div className="mx-auto flex w-fit rounded-2xl bg-greenMain/10 p-3">
                <Mail size={28} className="text-greenMain" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-blueMain">
                E-mail de contato
              </h2>

              <a
                href={`mailto:${EMAIL_CONTATO}`}
                className="mt-4 inline-block break-all text-xl font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-4 hover:text-orangeMain"
              >
                {EMAIL_CONTATO}
              </a>

              {NOME_RESPONSAVEL && (
                <p className="mt-4 text-base text-blueMain/80">
                  Responsável pela plataforma: {NOME_RESPONSAVEL}
                </p>
              )}

              <p className="mt-4 text-sm text-blueMain/70">
                O retorno depende da disponibilidade da equipe responsável.
                Não há prazo de resposta garantido.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <HelpCircle size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Para que serve este canal
                </h2>
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-7 text-blueMain">
                <li>dúvidas sobre o funcionamento da plataforma;</li>
                <li>problemas técnicos, erros e dificuldades de acesso;</li>
                <li>dúvidas sobre planos, limites e contagem diária;</li>
                <li>
                  solicitações relacionadas à privacidade e aos dados pessoais;
                </li>
                <li>
                  denúncias de conteúdo inadequado, de questões ou de conduta
                  de usuários;
                </li>
                <li>sugestões e comentários sobre a experiência de estudo.</li>
              </ul>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <MessageSquare size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  O que informar na mensagem
                </h2>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain">
                Para facilitar o atendimento, inclua na mensagem:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-blueMain">
                <li>o motivo do contato, de forma breve e objetiva;</li>
                <li>
                  o e-mail utilizado na conta, quando a solicitação estiver
                  relacionada a ela;
                </li>
                <li>
                  a descrição do problema, com a página ou funcionalidade
                  envolvida;
                </li>
                <li>
                  o código da sala, quando o assunto for uma sala de estudo;
                </li>
                <li>
                  em caso de denúncia, o conteúdo ou a conduta observada e,
                  se possível, o contexto em que ocorreu.
                </li>
              </ul>

              <p className="mt-4 rounded-2xl bg-orangeMain/10 px-5 py-4 text-base leading-7 text-blueMain">
                <strong className="font-semibold">
                  Não envie sua senha por e-mail.
                </strong>{" "}
                A equipe do Adaptapus não precisa da senha para analisar
                problemas de conta.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <ShieldCheck size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Privacidade e termos
                </h2>
              </div>

              <p className="mt-5 text-base leading-7 text-blueMain">
                Antes de enviar uma solicitação sobre dados pessoais, consulte a{" "}
                <Link
                  href="/privacidade"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  Política de Privacidade
                </Link>
                . Ela explica quais dados são tratados, quais serviços de
                terceiros participam da plataforma e como exercer os direitos
                previstos na LGPD.
              </p>

              <p className="mt-4 text-base leading-7 text-blueMain">
                As condições de uso, as regras de convivência nas salas e os
                limites de cada plano estão nos{" "}
                <Link
                  href="/termos"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  Termos de Uso
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
