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
    <div className="w-full bg-blueMain border border-blueSecond rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">

      {gerandoQuestao ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p
            className={`
              text-lg
              text-whiteMain
              transition-opacity
              duration-300
              ${loadingVisible ? "opacity-100" : "opacity-0"}
            `}
          >
            {loadingMessages[loadingIndex]}
          </p>

          <p className="text-sm text-whiteMain/60 mt-2">
            Aguarde enquanto a inteligência artificial adapta a questão
          </p>
        </div>
      ) : !question ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-lg text-whiteMain">
            Nenhuma questão ativa no momento
          </p>

          <p className="text-sm text-whiteMain/60 mt-2">
            O administrador deve escolher um tema e adaptar a questão
          </p>
        </div>
      ) : (
        <div>
          {/* CABEÇALHO DA QUESTÃO */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-2xl font-bold text-whiteMain">
              {question.title}
            </h2>

            <span className="text-sm text-orangeSecond">
              {question.materia}
            </span>
          </div>

          {/* DENÚNCIA */}
          <button
            onClick={() => setDenunciaQuestaoAberta(true)}
            className="
              mb-4
              text-sm
              text-orangeThird
              hover:text-orangeSecond
              transition
            "
          >
            Denunciar questão
          </button>

          <DenunciaQuestao
            aberto={denunciaQuestaoAberta}
            fechar={() => setDenunciaQuestaoAberta(false)}
            questao={`
              Tema: ${question.temaAdaptacao || "Não informado"}

              Questão:
              ${question.text}

              Resposta correta:
              ${question.respostas?.[question.correta] || "Não informada"}

              I.A usada:
              ${question.modeloIA}
            `.trim()}
          />

          {/* ENUNCIADO */}
          <p className="text-whiteMain/90 mb-5 whitespace-pre-line">
            {question.text}
          </p>

          {/* ALTERNATIVAS */}
          <div className="space-y-2">
            {question.respostas?.map(
              (resposta: string, index: number) => {
                const selecionada =
                  respostaSelecionada === index;

                const ehCorreta =
                  votingFinalizado &&
                  resultadoFinal?.correta === index;

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
                          ? "bg-greenMain/20 border-greenMain text-whiteMain"
                          : marcadaErrada
                            ? "bg-red-500/20 border-red-400 text-whiteMain"
                            : selecionada
                              ? "bg-orangeMain/20 border-orangeMain text-whiteMain"
                              : "bg-blueSecond/20 border-blueSecond hover:bg-blueSecond/30 text-whiteMain"
                      }
                    `}
                  >
                    {resposta}

                    <span className="text-whiteMain/50 ml-1">
                      ({votes[index] || 0} votos)
                    </span>
                  </button>
                );
              },
            )}
          </div>

          {/* CONFIRMAR RESPOSTA */}
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
            {votingFinalizado
              ? "Votação encerrada"
              : javotou
                ? "Resposta confirmada"
                : "Confirmar resposta"}
          </button>

          {/* RESULTADO */}
          {votingFinalizado && resultadoFinal && (
            <div
              className={`
                mt-4
                p-4
                rounded-xl
                border
                ${
                  resultadoFinal.maioriaAcertou
                    ? "bg-greenMain/10 border-greenMain/40 text-greenMain"
                    : "bg-red-500/10 border-red-400/40 text-red-300"
                }
              `}
            >
              <p className="font-semibold text-lg mb-1">
                {resultadoFinal.maioriaAcertou
                  ? "A maioria da sala acertou!"
                  : "A maioria da sala errou!"}
              </p>

              <p className="text-sm opacity-80">
                {resultadoFinal.acertos} acertaram ·{" "}
                {resultadoFinal.erros} erraram
              </p>
            </div>
          )}

          {/* INFORMAÇÕES DA QUESTÃO */}
          <div className="mt-4 pt-3 border-t border-blueSecond">
            <p className="text-xs text-whiteMain/50">
              Gerado por:{" "}
              <span className="text-whiteMain/70">
                {question.modeloIA || "outro"}
              </span>
            </p>

            {question.temaAdaptacao && (
              <p className="text-xs text-whiteMain/50 mt-1">
                Tema:{" "}
                <span className="text-whiteMain/70">
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
