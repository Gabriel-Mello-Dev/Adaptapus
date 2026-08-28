type Props = {
  title: string;
  text: string;
  respostas: string[];
  perguntando: boolean;
  respostaEscolhida: number;
  materia: string;
  modeloIA: string;

  questao: string;
  tema: string;

  setRespostaEscolhida: (i: number) => void;
  onGerar: () => void;
  onVerificar: () => void;
  setQuestao: (v: string) => void;
  setTema: (v: string) => void;
};

import { QuestionHeader } from "./index";

export default function QuestionCard(props: Props) {
  const questaoExiste = props.respostas.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a0f2e] to-[#2a0f3a] flex flex-col items-center p-6">
      <QuestionHeader />

      <div className="w-full max-w-2xl bg-[#1c1c2b] rounded-2xl shadow-lg p-6 border border-purple-900">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Pergunta base
            </label>

            <input
              type="text"
              value={props.questao}
              onChange={(e) => props.setQuestao(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Tema</label>

            <input
              type="text"
              value={props.tema}
              onChange={(e) => props.setTema(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            onClick={props.onGerar}
            disabled={props.perguntando}
            className="w-full py-3 rounded-lg bg-purple-700 hover:bg-purple-600 disabled:opacity-50 transition text-white font-semibold"
          >
            {props.perguntando ? "Gerando pergunta..." : "Gerar pergunta"}
          </button>
        </div>

        {/* Pergunta */}
        {questaoExiste && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-purple-300">
              {props.title}
            </h2>

            <p className="text-gray-300 mt-3">{props.text}</p>
          </div>
        )}

        {/* Respostas */}
        {questaoExiste && (
          <div className="mt-6 space-y-3">
            {props.respostas.map((resp, i) => (
              <button
                key={i}
                onClick={() => props.setRespostaEscolhida(i)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  props.respostaEscolhida === i
                    ? "bg-purple-700 border-purple-500 text-white"
                    : "bg-[#0f0f1a] border-gray-700 text-gray-300 hover:border-purple-500"
                }`}
              >
                {resp}
              </button>
            ))}
          </div>
        )}

        {/* Verificar */}
        {questaoExiste && (
          <>
            <button
              onClick={props.onVerificar}
              className="w-full mt-6 py-3 rounded-lg bg-green-600 hover:bg-green-400 transition text-white font-semibold"
            >
              Verificar resposta
            </button>

            {/* Modelo */}
            <div className="mt-4 pt-3 border-t border-purple-900">
              <p className="text-xs text-gray-500">
                Gerado por:{" "}
                <span className="text-purple-300">
                  {props.modeloIA || "outro"}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
