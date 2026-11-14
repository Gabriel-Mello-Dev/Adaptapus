import Link from "next/link";
import { ArrowRight, Brain, Sparkles, Users } from "lucide-react";

export default function HomeInfo() {
    return (
        <section
            aria-labelledby="entenda-o-adaptapus"
            className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16"
        >
            <div className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <div className="mx-auto max-w-2xl text-center">
                    <h2
                        id="entenda-o-adaptapus"
                        className="text-3xl font-bold text-blueMain"
                    >
                        Entenda o Adaptapus
                    </h2>

                    <p className="mt-3 text-base leading-7 text-blueMain/80">
                        Uma ferramenta de apoio ao estudo que aproxima as
                        questões escolares dos interesses de cada estudante.
                    </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl bg-greenMain/5 p-6">
                        <div className="w-fit rounded-2xl bg-greenMain/10 p-3">
                            <Brain size={26} className="text-greenMain" />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-blueMain">
                            Como funciona em 3 passos
                        </h3>

                        <p className="mt-2 text-base leading-7 text-blueMain/80">
                            Escolha um tema de interesse, informe a questão que
                            deseja estudar e peça a adaptação. A inteligência
                            artificial reescreve o contexto, mantendo o
                            exercício, os dados e a resposta correta. Depois,
                            resolva a questão e confira o resultado com atenção.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-orangeMain/5 p-6">
                        <div className="w-fit rounded-2xl bg-orangeMain/10 p-3">
                            <Sparkles size={26} className="text-orangeMain" />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-blueMain">
                            O que você encontra no Adaptapus
                        </h3>

                        <p className="mt-2 text-base leading-7 text-blueMain/80">
                            Adaptação de questões para estudar sozinho, salas
                            colaborativas com código de entrada, chat e votação,
                            registro de progresso por matéria, planos com
                            limites diários e canais de denúncia para questões
                            e condutas inadequadas.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-blueMain/5 p-6">
                        <div className="w-fit rounded-2xl bg-blueMain/10 p-3">
                            <Users size={26} className="text-blueMain" />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-blueMain">
                            Para quem é
                        </h3>

                        <p className="mt-2 text-base leading-7 text-blueMain/80">
                            Para estudantes que querem aproximar o conteúdo dos
                            próprios interesses, professores que buscam
                            variações contextualizadas e responsáveis que
                            acompanham o estudo. A plataforma é um apoio
                            educacional e não substitui aulas, material
                            didático ou a revisão de um professor.
                        </p>
                    </div>
                </div>

                <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm font-semibold text-blueMain">
                    <Link
                        href="/como-funciona"
                        className="inline-flex items-center gap-1 text-greenMain transition hover:text-orangeMain"
                    >
                        Como funciona
                        <ArrowRight size={14} />
                    </Link>

                    <span className="text-blueMain/30">•</span>

                    <Link
                        href="/exemplos"
                        className="inline-flex items-center gap-1 text-greenMain transition hover:text-orangeMain"
                    >
                        Exemplos
                        <ArrowRight size={14} />
                    </Link>

                    <span className="text-blueMain/30">•</span>

                    <Link
                        href="/guias"
                        className="inline-flex items-center gap-1 text-greenMain transition hover:text-orangeMain"
                    >
                        Guias
                        <ArrowRight size={14} />
                    </Link>

                    <span className="text-blueMain/30">•</span>

                    <Link
                        href="/sobre"
                        className="inline-flex items-center gap-1 text-greenMain transition hover:text-orangeMain"
                    >
                        Sobre o Adaptapus
                        <ArrowRight size={14} />
                    </Link>
                </p>
            </div>
        </section>
    );
}
