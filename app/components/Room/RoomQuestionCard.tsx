import { DenunciaQuestao } from "@/app/components/Denuncias";

interface Question {
  title: string;
  text: string;
  materia: string;
  respostas?: string[];
  correta: number;
  modeloIA?: string;
  temaAdaptacao?: string;
}

interface ResultadoFinal {
  correta: number;
  maioriaAcertou: boolean;
  acertos: number;
  erros: number;
}

interface RoomQuestionCardProps {
  question: Question | null;

  gerandoQuestao: boolean;

  loadingIndex: number;
  loadingVisible: boolean;
  loadingMessages: string[];

  denunciaQuestaoAberta: boolean;
  setDenunciaQuestaoAberta: (value: boolean) => void;

  respostaSelecionada: number | null;
  selecionarResposta: (index: number) => void;
  confirmarResposta: () => void;

  votes: Record<number, number>;

  javotou: boolean;
  votingFinalizado: boolean;

  resultadoFinal: ResultadoFinal | null;
}

export default function RoomQuestionCard({
  question,
  gerandoQuestao,
  loadingIndex,
  loadingVisible,
  loadingMessages,
  denunciaQuestaoAberta,
  setDenunciaQuestaoAberta,
  respostaSelecionada,
  selecionarResposta,
  confirmarResposta,
  votes,
  javotou,
  votingFinalizado,
  resultadoFinal,
}: RoomQuestionCardProps) {
  return (
    <div className="w-full max-w-3xl mb-6 bg-[#1e1038] border border-[#332156] rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
      {gerandoQuestao ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p
            className={`
              text-lg
              text-purple-200
              transition-opacity
              duration-300
              ${loadingVisible ? "opacity-100" : "opacity-0"}
            `}
          >
            {loadingMessages[loadingIndex]}
          </p>

          <p className="text-sm text-purple-400 mt-2">
            Aguarde enquanto a inteligência artificial adapta a questão
          </p>
        </div>
      ) : !question ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-lg text-purple-200">
            Nenhuma questão ativa no momento
          </p>

          <p className="text-sm text-purple-400 mt-2">
            O administrador deve escolher um tema e adaptar a questão
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-2xl font-bold">{question.title}</h2>

            <span className="text-sm text-purple-400">{question.materia}</span>
          </div>

          <button
            onClick={() => setDenunciaQuestaoAberta(true)}
            className="mb-4 text-sm text-red-400 hover:text-red-300"
          >
            Denunciar questão
          </button>

          <DenunciaQuestao
            aberto={denunciaQuestaoAberta}
            fechar={() => setDenunciaQuestaoAberta(false)}
            questao={`
            Tema: ${question.temaAdaptacao || "Não informado"}

            \
            Questão:
            ${question.text}

            \
            Resposta correta:
            ${question.respostas?.[question.correta] || "Não informada"}

            \
            I.A usada:
            ${question.modeloIA}
            `.trim()}
          />

          <p className="text-purple-200 mb-5 whitespace-pre-line">
            {question.text}
          </p>

          <div className="space-y-2">
            {question.respostas?.map((resposta: string, index: number) => {
              const selecionada = respostaSelecionada === index;

              const ehCorreta =
                votingFinalizado && resultadoFinal?.correta === index;

              const marcadaErrada =
                votingFinalizado &&
                selecionada &&
                resultadoFinal?.correta !== index;

              return (
                <button
                  key={index}
                  onClick={() => selecionarResposta(index)}
                  disabled={votingFinalizado || gerandoQuestao}
                  className={`
                    w-full
                    text-left
                    border
                    transition
                    p-3
                    rounded-xl

                    ${
                      ehCorreta
                        ? "bg-emerald-600/30 border-emerald-400"
                        : marcadaErrada
                          ? "bg-red-600/30 border-red-400"
                          : selecionada
                            ? "bg-purple-600/30 border-purple-400"
                            : "bg-[#2a1750] border-[#3d2769] hover:bg-[#33195e]"
                    }
                  `}
                >
                  {resposta}

                  <span className="text-purple-300/70 ml-1">
                    ({votes[index] || 0} votos)
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={confirmarResposta}
            disabled={
              respostaSelecionada === null ||
              javotou ||
              votingFinalizado ||
              gerandoQuestao
            }
            className="
              mt-4
              w-full
              bg-emerald-600
              hover:bg-emerald-500
              disabled:opacity-50
              disabled:hover:bg-emerald-600
              transition
              py-3
              rounded-xl
              font-semibold
            "
          >
            {votingFinalizado
              ? "Votação encerrada"
              : javotou
                ? "Resposta confirmada"
                : "Confirmar resposta"}
          </button>

          {votingFinalizado && resultadoFinal && (
            <div
              className={`
                mt-4
                p-4
                rounded-xl
                border
                ${
                  resultadoFinal.maioriaAcertou
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                    : "bg-red-500/10 border-red-500/30 text-red-200"
                }
              `}
            >
              <p className="font-semibold text-lg mb-1">
                {resultadoFinal.maioriaAcertou
                  ? "A maioria da sala acertou!"
                  : "A maioria da sala errou!"}
              </p>

              <p className="text-sm opacity-80">
                {resultadoFinal.acertos} acertaram · {resultadoFinal.erros}{" "}
                erraram
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#332156]">
            <p className="text-xs text-purple-400/70">
              Gerado por:{" "}
              <span className="text-purple-300/80">
                {question.modeloIA || "outro"}
              </span>
            </p>

            {question.temaAdaptacao && (
              <p className="text-xs text-purple-400/70 mt-1">
                Tema:{" "}
                <span className="text-purple-300/80">
                  {question.temaAdaptacao}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
