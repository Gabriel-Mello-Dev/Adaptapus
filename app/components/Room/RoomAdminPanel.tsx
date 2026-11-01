
"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import ModalEnunciado from "./ModalEnunciado";

interface Questao {
  id: string;
  numero: number;
  materia: string;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  resposta: string;
}

interface Materia {
  nome: string;
  arquivo: string;
}

interface RoomAdminPanelProps {
  materias: Materia[];
  materiaSelecionada: string;
  setMateriaSelecionada: (value: string) => void;

  gerandoQuestao: boolean;
  question: any;

  questoes: Questao[];
  indiceQuestao: number;
  setIndiceQuestao: (value: number) => void;
  selecionarQuestaoSala: (index: number) => void;

  tema: string;
  setTema: (value: string) => void;

  criarPergunta: () => void;
  finalizarVotacao: () => void;
  proximaQuestao: () => void;

  votingFinalizado: boolean;
}

export default function RoomAdminPanel({
  materias,
  materiaSelecionada,
  setMateriaSelecionada,
  gerandoQuestao,
  question,
  questoes,
  indiceQuestao,
  selecionarQuestaoSala,
  tema,
  setTema,
  criarPergunta,
  finalizarVotacao,
  proximaQuestao,
  votingFinalizado,
}: RoomAdminPanelProps) {
  const [modalEnunciadoAberto, setModalEnunciadoAberto] = useState(false);

  const questaoAtual = questoes[indiceQuestao];

  return (
    <>
      <section className="w-full overflow-hidden rounded-2xl border border-blueSecond bg-blueMain shadow-lg">
        {/* CABEÇALHO */}
        <div className="border-b border-blueSecond px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-whiteMain">
                Painel do administrador
              </h2>

              <p className="mt-1 text-xs text-whiteMain/60">
                Gerencie as questões e a votação da sala.
              </p>
            </div>

            <span className="shrink-0 rounded-lg border border-orangeMain/30 bg-orangeMain/10 px-3 py-1.5 text-xs font-semibold text-orangeMain">
              ADMIN
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6">
          {/* SELEÇÃO DE MATÉRIA */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-whiteMain/60">
              Matéria
            </label>

            <select
              value={materiaSelecionada}
              onChange={(e) => setMateriaSelecionada(e.target.value)}
              disabled={gerandoQuestao || !!question}
              className="w-full rounded-xl border border-blueSecond bg-blueSecond/30 px-3 py-3 text-sm text-whiteMain outline-none transition focus:border-orangeMain disabled:cursor-not-allowed disabled:opacity-50"
            >
              {materias.map((materia) => (
                <option
                  key={materia.arquivo}
                  value={materia.arquivo}
                  className="bg-blueMain text-whiteMain"
                >
                  {materia.nome}
                </option>
              ))}
            </select>
          </div>

          {/* BANCO DE QUESTÕES */}
          <div className="rounded-xl border border-orangeMain/20 bg-orangeMain/5 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-whiteMain">
                  Banco de questões
                </h3>

                <p className="mt-0.5 text-xs text-whiteMain/50">
                  Selecione uma questão para atualizar a sala.
                </p>
              </div>

              <span className="rounded-md border border-orangeMain/20 bg-orangeMain/10 px-2 py-1 text-xs font-semibold text-orangeMain">
                {questoes.length} questões
              </span>
            </div>

            <select
              value={indiceQuestao}
              onChange={(e) =>
                selecionarQuestaoSala(Number(e.target.value))
              }
              disabled={gerandoQuestao || questoes.length === 0}
              className="w-full rounded-lg border border-orangeMain/40 bg-blueMain px-3 py-3 text-sm font-medium text-whiteMain outline-none transition hover:border-orangeMain focus:border-orangeMain focus:ring-1 focus:ring-orangeMain/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {questoes.map((questao, index) => (
                <option
                  key={questao.id}
                  value={index}
                  className="bg-blueMain text-whiteMain"
                >
                  Questão {questao.numero} | {questao.materia}
                </option>
              ))}
            </select>
          </div>

      

          {/* ENUNCIADO ORIGINAL */}
          <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-4">
            <p className="mb-2 text-sm font-semibold text-orangeSecond">
              Questão original
            </p>

            <p className="line-clamp-4 whitespace-pre-line break-words text-sm text-whiteMain/80">
              {questaoAtual?.enunciado}
            </p>

            <button
              type="button"
              onClick={() => setModalEnunciadoAberto(true)}
              disabled={!questaoAtual}
              className="
                mt-4 flex w-full items-center justify-center gap-2
                rounded-xl bg-greenMain px-4 py-2.5
                font-semibold text-whiteMain
                transition hover:bg-greenMain/80
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              <Eye size={18} />
              Ver Enunciado
            </button>
          </div>

          {/* DIVISOR */}
          <div className="h-px bg-blueSecond" />

          {/* ADAPTAÇÃO COM IA */}
          <div>
            <div className="mb-3">
              <h3 className="text-3xl font-semibold text-whiteMain">
                Adaptação 
              </h3>

              <p className="mt-1 text-xs text-whiteMain/50">
                Personalize a questão com um tema de sua escolha.
              </p>
            </div>

            <label className="mb-2 block text-xs font-medium text-whiteMain/70">
              Tema da adaptação
            </label>

            <input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              disabled={gerandoQuestao || !!question}
              placeholder="Ex.: Naruto, futebol, tecnologia..."
              className="w-full rounded-lg border border-blueSecond bg-blueSecond/30 px-3 py-3 text-sm text-whiteMain outline-none transition placeholder:text-whiteMain/35 focus:border-orangeMain disabled:opacity-50"
            />

            {!question && (
              <button
                onClick={criarPergunta}
                disabled={gerandoQuestao || !tema.trim() || !questaoAtual}
                className="mt-3 w-full rounded-lg bg-orangeMain px-4 py-3 text-sm font-bold text-whiteMain transition hover:bg-orangeSecond disabled:cursor-not-allowed disabled:opacity-40"
              >
                {gerandoQuestao
                  ? "Adaptando questão..."
                  : "Adaptar questão"}
              </button>
            )}
          </div>

          {/* CONTROLE DA VOTAÇÃO */}
          {question && (
            <div className="border-t border-blueSecond pt-4">
              <button
                onClick={finalizarVotacao}
                disabled={votingFinalizado || gerandoQuestao}
                className="w-full rounded-lg bg-orangeMain px-4 py-3 text-sm font-bold text-whiteMain transition hover:bg-orangeSecond disabled:cursor-not-allowed disabled:opacity-50"
              >
                {votingFinalizado
                  ? "Votação finalizada"
                  : "Finalizar votação"}
              </button>

              {votingFinalizado && (
                <button
                  onClick={proximaQuestao}
                  disabled={indiceQuestao >= questoes.length - 1}
                  className="mt-2 w-full rounded-lg border border-orangeMain px-4 py-3 text-sm font-semibold text-orangeMain transition hover:bg-orangeMain/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {indiceQuestao >= questoes.length - 1
                    ? "Última questão"
                    : "Próxima questão"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* MODAL DO ENUNCIADO */}
      <ModalEnunciado
        aberto={modalEnunciadoAberto}
        fechar={() => setModalEnunciadoAberto(false)}
        titulo={`Questão ${questaoAtual?.numero ?? ""} | ${questaoAtual?.materia ?? ""}`}
        enunciado={questaoAtual?.enunciado ?? ""}
      />
    </>
  );
}
