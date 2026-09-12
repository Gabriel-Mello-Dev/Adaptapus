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
    <div className="bg-whiteMain flex flex-1 flex-col items-center p-6">

      <QuestionHeader />

      <div className="w-full max-w-2xl bg-blueMain rounded-2xl shadow-lg p-6 border border-blueSecond">

        {/* Inputs */}
        <div className="space-y-4">

          {/* PERGUNTA BASE */}
          <div>
            <label className="block text-sm text-whiteMain/70 mb-1">
              Pergunta base
            </label>

            <input
              type="text"
              value={props.questao}
              onChange={(e) => props.setQuestao(e.target.value)}
              className="
                w-full
                p-3
                rounded-lg
                bg-blueSecond/20
                border
                border-blueSecond
                text-whiteMain
                placeholder:text-whiteMain/40
                focus:outline-none
                focus:ring-2
                focus:ring-orangeMain
              "
            />
          </div>

          {/* TEMA */}
          <div>
            <label className="block text-sm text-whiteMain/70 mb-1">
              Tema
            </label>

            <input
              type="text"
              value={props.tema}
              onChange={(e) => props.setTema(e.target.value)}
              className="
                w-full
                p-3
                rounded-lg
                bg-blueSecond/20
                border
                border-blueSecond
                text-whiteMain
                placeholder:text-whiteMain/40
                focus:outline-none
                focus:ring-2
                focus:ring-orangeMain
              "
            />
          </div>

          {/* GERAR */}
          <button
            onClick={props.onGerar}
            disabled={props.perguntando}
            className="
              w-full
              py-3
              rounded-lg
              bg-orangeMain
              hover:bg-orangeSecond
              disabled:opacity-50
              disabled:hover:bg-orangeMain
              transition
              text-whiteMain
              font-semibold
            "
          >
            {props.perguntando
              ? "Gerando pergunta..."
              : "Gerar pergunta"}
          </button>
        </div>

        {/* PERGUNTA */}
        {questaoExiste && (
          <div className="mt-8">

            <h2 className="text-2xl font-semibold text-orangeSecond">
              {props.title}
            </h2>

            <p className="text-whiteMain/80 mt-3">
              {props.text}
            </p>

          </div>
        )}

        {/* RESPOSTAS */}
        {questaoExiste && (
          <div className="mt-6 space-y-3">

            {props.respostas.map((resp, i) => (
              <button
                key={i}
                onClick={() => props.setRespostaEscolhida(i)}
                className={`
                  w-full
                  text-left
                  p-3
                  rounded-lg
                  border
                  transition
                  ${
                    props.respostaEscolhida === i
                      ? "bg-orangeMain/20 border-orangeMain text-whiteMain"
                      : "bg-blueSecond/20 border-blueSecond text-whiteMain/80 hover:border-orangeMain"
                  }
                `}
              >
                {resp}
              </button>
            ))}

          </div>
        )}

        {/* VERIFICAR */}
        {questaoExiste && (
          <>
            <button
              onClick={props.onVerificar}
              className="
                w-full
                mt-6
                py-3
                rounded-lg
                bg-greenMain
                hover:bg-greenMain/80
                transition
                text-whiteMain
                font-semibold
              "
            >
              Verificar resposta
            </button>

            {/* MODELO */}
            <div className="mt-4 pt-3 border-t border-blueSecond">

              <p className="text-xs text-whiteMain/50">
                Gerado por:{" "}
                <span className="text-whiteMain/70">
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
