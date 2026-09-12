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
    <div className="w-full bg-blueMain border border-blueSecond rounded-2xl p-6">
      {/* TÍTULO */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-whiteMain">
          Painel do Administrador
        </h2>

        <p className="mt-1 text-sm text-whiteMain/70">
          Controle as questões e a votação da sala.
        </p>
      </div>

      {/* MATÉRIA */}
      <div>
        <label className="block mb-2 text-sm font-medium text-whiteMain">
          Matéria
        </label>

        <select
          value={materiaSelecionada}
          onChange={(e) => setMateriaSelecionada(e.target.value)}
          disabled={gerandoQuestao || !!question}
          className="
            w-full
            bg-blueSecond/30
            border
            border-blueSecond
            text-whiteMain
            px-4
            py-3
            rounded-xl
            outline-none
            transition
            focus:border-orangeMain
            disabled:opacity-50
          "
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

      <div className="flex flex-col gap-4 mt-4">
        {/* QUESTÃO ATUAL */}
        <div className="bg-blueSecond/20 border border-blueSecond rounded-xl p-4">
          <p className="text-sm text-orangeSecond">
            Questão atual
          </p>

          <p className="text-2xl font-bold mt-1 text-whiteMain">
            Questão {questoes[indiceQuestao]?.numero}
          </p>

          <p className="text-sm text-whiteMain/60 mt-1">
            {indiceQuestao + 1} de {questoes.length}
          </p>
        </div>

        {/* TEMA */}
        <div>
          <label className="block mb-2 text-sm font-medium text-whiteMain">
            Tema da adaptação
          </label>

          <input
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            disabled={gerandoQuestao || !!question}
            placeholder="Exemplo: Naruto, futebol, tecnologia, anime..."
            className="
              w-full
              bg-blueSecond/30
              border
              border-blueSecond
              text-whiteMain
              placeholder:text-whiteMain/40
              px-4
              py-3
              rounded-xl
              outline-none
              transition
              focus:border-orangeMain
              disabled:opacity-50
            "
          />
        </div>

        {/* QUESTÃO ORIGINAL */}
        <div className="bg-blueSecond/20 border border-blueSecond rounded-xl p-4">
          <p className="text-sm text-orangeSecond mb-2">
            Questão original
          </p>

          <p className="text-sm text-whiteMain/80 line-clamp-4">
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
              w-full
              bg-orangeMain
              hover:bg-orangeSecond
              text-whiteMain
              disabled:opacity-50
              disabled:hover:bg-orangeMain
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
              w-full
              bg-orangeMain
              hover:bg-orangeSecond
              text-whiteMain
              disabled:opacity-50
              disabled:hover:bg-orangeMain
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
              w-full
              bg-greenMain
              hover:bg-greenMain/80
              text-whiteMain
              disabled:opacity-50
              disabled:hover:bg-greenMain
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
