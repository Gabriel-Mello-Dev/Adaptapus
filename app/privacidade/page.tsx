import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Clock, Database, Mail, Shield, UserCheck } from "lucide-react";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  EMAIL_CONTATO,
  NOME_RESPONSAVEL,
  URL_SITE,
} from "@/app/institucional/siteInfo";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba quais dados o Adaptapus trata, para que eles são usados, quais serviços de terceiros participam da plataforma e como exercer seus direitos como titular.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function Privacidade() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />

      <main className="flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-greenMain sm:text-5xl">
              Política de Privacidade
            </h1>

            <div className="my-3 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-greenMain/40" />
              <Brain size={28} className="text-greenMain" />
              <span className="h-px w-20 bg-greenMain/40" />
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blueMain/90">
              Esta política explica de forma direta quais dados o Adaptapus
              trata, por que eles são necessários e como o usuário pode
              exercer seus direitos. Ela descreve o funcionamento atual da
              plataforma e deve ser lida em conjunto com os Termos de Uso.
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
                  <Shield size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Quem é responsável pela plataforma
                </h2>
              </div>

              <p className="mt-5">
                O Adaptapus é uma plataforma educacional que utiliza
                inteligência artificial para adaptar questões de estudo a
                temas de interesse do aluno. A plataforma é mantida no
                endereço{" "}
                <a
                  href={URL_SITE}
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  {URL_SITE}
                </a>
                .
              </p>

              {NOME_RESPONSAVEL ? (
                <p className="mt-4">
                  Responsável pela plataforma: {NOME_RESPONSAVEL}. Para
                  assuntos relacionados a dados pessoais, o canal de contato é
                  o e-mail{" "}
                  <a
                    href={`mailto:${EMAIL_CONTATO}`}
                    className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                  >
                    {EMAIL_CONTATO}
                  </a>
                  .
                </p>
              ) : (
                <p className="mt-4">
                  O nome do responsável pela plataforma ainda não foi
                  divulgado nesta página. Para qualquer dúvida sobre dados
                  pessoais, o canal oficial de contato é o e-mail{" "}
                  <a
                    href={`mailto:${EMAIL_CONTATO}`}
                    className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                  >
                    {EMAIL_CONTATO}
                  </a>
                  .
                </p>
              )}

              <p className="mt-4">
                Esta política não indica um encarregado de proteção de dados
                (DPO) porque essa informação ainda não foi definida pelo
                responsável. Solicitações relacionadas à LGPD podem ser
                enviadas ao e-mail de contato acima.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Database size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Quais dados são tratados
                </h2>
              </div>

              <p className="mt-5">
                Os dados tratados são aqueles necessários para o funcionamento
                da plataforma e para a prestação do serviço educacional. De
                acordo com o que o sistema registra atualmente, estão
                incluídos:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold">Dados de cadastro:</strong>{" "}
                  nome e e-mail informados no momento da criação da conta. A
                  autenticação e o armazenamento da conta são realizados pelo
                  Supabase.
                </li>
                <li>
                  <strong className="font-semibold">
                    Plano e limite diário:
                  </strong>{" "}
                  identificação do plano escolhido e quantidade de adaptações
                  realizadas no dia, usados para aplicar os limites de cada
                  plano.
                </li>
                <li>
                  <strong className="font-semibold">
                    Dados de uso e progresso:
                  </strong>{" "}
                  acertos, erros e total de questões por matéria, além dos
                  temas informados para adaptação.
                </li>
                <li>
                  <strong className="font-semibold">Salas de estudo:</strong>{" "}
                  participação em salas, código da sala, mensagens enviadas no
                  chat, respostas dadas na votação e indicação de quem criou a
                  sala.
                </li>
                <li>
                  <strong className="font-semibold">Denúncias:</strong>{" "}
                  conteúdo da denúncia, identificação do usuário que denuncia
                  e do usuário ou questão denunciados, quando aplicável.
                </li>
                <li>
                  <strong className="font-semibold">
                    Textos enviados para adaptação:
                  </strong>{" "}
                  enunciados de questões e temas de interesse digitados pelo
                  usuário, que são enviados ao serviço de inteligência
                  artificial para gerar a versão adaptada.
                </li>
              </ul>

              <p className="mt-4">
                A plataforma não solicita, no cadastro, documentos, endereço,
                telefone ou dados de pagamento. Caso o usuário inclua
                voluntariamente informações pessoais no chat ou no campo de
                questão, esses textos também serão tratados como parte do
                funcionamento do serviço.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <UserCheck size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Para que os dados são usados
                </h2>
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-6">
                <li>Criar e manter a conta do usuário e permitir o login.</li>
                <li>
                  Adaptar questões para o tema informado, incluindo o envio do
                  enunciado e do tema ao provedor de inteligência artificial.
                </li>
                <li>
                  Registrar o progresso de estudo e os temas utilizados, para
                  que o usuário acompanhe seu histórico na plataforma.
                </li>
                <li>
                  Controlar o plano contratado e o limite diário de adaptações.
                </li>
                <li>
                  Permitir a participação em salas de estudo, o chat e a
                  votação colaborativa.
                </li>
                <li>
                  Receber, analisar e moderar denúncias de conteúdo ou de
                  conduta.
                </li>
                <li>
                  Manter a segurança da plataforma, prevenir abusos e
                  solucionar problemas técnicos.
                </li>
                <li>
                  Exibir anúncios por meio do Google AdSense, conforme
                  explicado nesta política.
                </li>
              </ul>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Shield size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Cookies e tecnologias semelhantes
                </h2>
              </div>

              <p className="mt-5">
                A plataforma utiliza cookies e mecanismos de armazenamento
                necessários para manter a sessão do usuário autenticado, por
                meio do Supabase. Sem esses recursos, o login e a permanência
                na conta não funcionam.
              </p>

              <p className="mt-4">
                Também é utilizado o Vercel Analytics para acompanhar métricas
                agregadas de acesso e desempenho do site. A plataforma exibe
                anúncios do Google AdSense, que podem utilizar cookies e
                identificadores próprios.
              </p>

              <h3 className="mt-6 text-xl font-bold text-blueMain">
                Publicidade e cookies de terceiros
              </h3>

              <p className="mt-3">
                Fornecedores terceiros, inclusive o Google, usam cookies para
                exibir anúncios com base em visitas anteriores do usuário a
                este site e a outros sites. O uso de cookies de publicidade
                permite que o Google e seus parceiros exibam anúncios com base
                nas visitas do usuário a este e a outros sites.
              </p>

              <p className="mt-4">
                O usuário pode desativar a publicidade personalizada nas{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  Configurações de anúncios do Google
                </a>{" "}
                ou obter mais informações sobre opções de desativação em{" "}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  www.aboutads.info
                </a>
                . Para entender como o Google utiliza cookies em publicidade,
                consulte a{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  política de publicidade do Google
                </a>
                .
              </p>

              <p className="mt-4">
                O usuário também pode gerenciar cookies nas configurações do
                próprio navegador. A desativação de cookies essenciais pode
                impedir o login e o uso de áreas restritas da plataforma.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Database size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Serviços de terceiros
                </h2>
              </div>

              <p className="mt-5">
                Para funcionar, o Adaptapus utiliza serviços de terceiros que
                podem processar dados em nome da plataforma. Os serviços
                identificados no funcionamento atual são:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold">Supabase:</strong>{" "}
                  autenticação, banco de dados e armazenamento das informações
                  da conta, do progresso, dos temas, das salas e das denúncias.
                </li>
                <li>
                  <strong className="font-semibold">Vercel:</strong>{" "}
                  hospedagem do site e métricas de acesso por meio do Vercel
                  Analytics.
                </li>
                <li>
                  <strong className="font-semibold">Google AdSense:</strong>{" "}
                  exibição de anúncios e uso de cookies de publicidade.
                </li>
                <li>
                  <strong className="font-semibold">Groq:</strong> provedor de
                  inteligência artificial que recebe o enunciado da questão e o
                  tema informado para gerar a versão adaptada.
                </li>
              </ul>

              <p className="mt-4">
                Esses serviços possuem políticas de privacidade próprias. O
                Adaptapus não controla as práticas internas de terceiros, mas
                mantém a indicação dos serviços utilizados para que o usuário
                saiba quem participa do tratamento.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <UserCheck size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Direitos do titular (LGPD)
                </h2>
              </div>

              <p className="mt-5">
                A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)
                garante ao titular direitos em relação aos seus dados pessoais.
                O usuário pode solicitar, conforme a lei:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>confirmação da existência de tratamento;</li>
                <li>acesso aos dados tratados;</li>
                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>
                  anonimização, bloqueio ou eliminação de dados desnecessários,
                  excessivos ou tratados em desconformidade com a lei;
                </li>
                <li>portabilidade dos dados, nos termos da regulamentação;</li>
                <li>
                  eliminação dos dados tratados com base no consentimento,
                  quando aplicável;
                </li>
                <li>
                  informação sobre as entidades com as quais os dados foram
                  compartilhados;
                </li>
                <li>
                  revogação do consentimento, quando o tratamento tiver essa
                  base legal.
                </li>
              </ul>

              <p className="mt-4">
                Para exercer esses direitos, o usuário pode enviar uma
                mensagem para{" "}
                <a
                  href={`mailto:${EMAIL_CONTATO}`}
                  className="font-semibold text-greenMain underline decoration-greenMain/40 underline-offset-2 hover:text-orangeMain"
                >
                  {EMAIL_CONTATO}
                </a>
                , informando o e-mail usado na conta e o pedido de forma
                clara. Alguns dados podem ser mantidos quando houver
                obrigação legal ou necessidade de exercício regular de
                direitos.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Shield size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Crianças e adolescentes
                </h2>
              </div>

              <p className="mt-5">
                O Adaptapus é uma ferramenta de apoio aos estudos e pode ser
                usado por estudantes menores de idade. Menores devem utilizar a
                plataforma com orientação e supervisão de um responsável legal.
                O responsável pode entrar em contato pelo e-mail indicado para
                solicitar informações ou a exclusão de dados de um menor sob
                sua responsabilidade, observadas as obrigações legais
                aplicáveis.
              </p>
            </section>

            <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-greenMain/10 p-3">
                  <Clock size={28} className="text-greenMain" />
                </div>
                <h2 className="text-2xl font-bold text-blueMain">
                  Retenção, segurança e alterações
                </h2>
              </div>

              <p className="mt-5">
                Os dados são mantidos enquanto a conta existir e enquanto forem
                necessários para a prestação do serviço. Esta versão da
                política ainda não define prazos específicos de retenção por
                categoria de dado. Essa definição deverá ser completada pelo
                responsável pela plataforma.
              </p>

              <p className="mt-4">
                São adotadas medidas técnicas compatíveis com o porte do
                projeto para proteger as informações, incluindo autenticação e
                controle de acesso. Nenhum sistema é totalmente imune a
                incidentes, e o usuário também deve proteger sua senha e não
                compartilhá-la.
              </p>

              <p className="mt-4">
                Esta política pode ser atualizada para refletir mudanças na
                plataforma ou na legislação. A versão vigente será sempre a
                publicada nesta página, com a data de atualização indicada no
                início.
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
                Dúvidas sobre esta política, pedidos relacionados aos dados
                pessoais e comunicações sobre privacidade podem ser enviados
                para{" "}
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
