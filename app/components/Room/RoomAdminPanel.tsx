import React from "react";

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
  tema,
  setTema,
  criarPergunta,
  finalizarVotacao,
  proximaQuestao,
  votingFinalizado,
}: RoomAdminPanelProps) {
  return (
    <div className="w-full max-w-3xl mb-6 bg-[#1e1038] border border-[#332156] rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">
        Painel do Administrador
      </h2>

      <div>
        <label className="text-sm text-purple-300 block mb-2">
          Matéria
        </label>

        <select
          value={materiaSelecionada}
          onChange={(e) => setMateriaSelecionada(e.target.value)}
          disabled={gerandoQuestao || !!question}
          className="
            w-full
            bg-[#2a1750]
            border
            border-[#3d2769]
            text-white
            px-4
            py-3
            rounded-xl
            outline-none
            focus:border-purple-400
            disabled:opacity-50
          "
        >
          {materias.map((materia) => (
            <option
              key={materia.arquivo}
              value={materia.arquivo}
              className="bg-[#2a1750]"
            >
              {materia.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {/* QUESTÃO ATUAL */}
        <div className="bg-[#2a1750] border border-[#3d2769] rounded-xl p-4">
          <p className="text-sm text-purple-400">
            Questão atual
          </p>

          <p className="text-2xl font-bold mt-1">
            Questão {questoes[indiceQuestao]?.numero}
          </p>

          <p className="text-sm text-purple-400 mt-1">
            {indiceQuestao + 1} de {questoes.length}
          </p>
        </div>

        {/* TEMA */}
        <div>
          <label className="text-sm text-purple-300 block mb-2">
            Tema da adaptação
          </label>

          <input
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            disabled={gerandoQuestao || !!question}
            placeholder="Exemplo: Naruto, futebol, tecnologia, anime..."
            className="
              w-full
              bg-[#2a1750]
              border
              border-[#3d2769]
              text-white
              placeholder:text-purple-400
              px-4
              py-3
              rounded-xl
              outline-none
              focus:border-purple-400
              disabled:opacity-50
            "
          />
        </div>

        {/* QUESTÃO ORIGINAL */}
        <div className="bg-[#2a1750] border border-[#3d2769] rounded-xl p-4">
          <p className="text-sm text-purple-400 mb-2">
            Questão original
          </p>

          <p className="text-sm text-purple-200 line-clamp-4">
            {questoes[indiceQuestao]?.enunciado}
          </p>
        </div>

        {/* ADAPTAR */}
        {!question && (
          <button
            onClick={criarPergunta}
            disabled={
              gerandoQuestao ||
              !tema.trim() ||
              !questoes[indiceQuestao]
            }
            className="
              bg-purple-600
              hover:bg-purple-500
              disabled:opacity-50
              disabled:hover:bg-purple-600
              transition
              py-3
              rounded-xl
              font-semibold
            "
          >
            {gerandoQuestao
              ? "Adaptando questão..."
              : "Adaptar questão"}
          </button>
        )}

        {/* FINALIZAR */}
        {question && (
          <button
            onClick={finalizarVotacao}
            disabled={votingFinalizado || gerandoQuestao}
            className="
              bg-amber-600
              hover:bg-amber-500
              disabled:opacity-50
              disabled:hover:bg-amber-600
              transition
              py-3
              rounded-xl
              font-semibold
            "
          >
            {votingFinalizado
              ? "Votação finalizada"
              : "Finalizar votação"}
          </button>
        )}

        {/* PRÓXIMA */}
        {votingFinalizado && (
          <button
            onClick={proximaQuestao}
            disabled={indiceQuestao >= questoes.length - 1}
            className="
              bg-purple-600
              hover:bg-purple-500
              disabled:opacity-50
              disabled:hover:bg-purple-600
              transition
              py-3
              rounded-xl
              font-semibold
            "
          >
            {indiceQuestao >= questoes.length - 1
              ? "Última questão"
              : "Próxima questão"}
          </button>
        )}
      </div>
    </div>
  );
}