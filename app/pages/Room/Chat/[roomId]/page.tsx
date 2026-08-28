/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { io } from "socket.io-client";
import { checkLoggedUser } from "@/app/libs/auth/authservices";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!);

const LOADING_MESSAGES = [
  "Adaptando sua questão...",
  "Questão sendo adaptada...",
  "Ajustando as alternativas...",
  "Quase pronto...",
];

type Questao = {
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
};

export default function ChatPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [indiceQuestao, setIndiceQuestao] = useState(0);
  const [carregandoQuestoes, setCarregandoQuestoes] = useState(true);

  const [question, setQuestion] = useState<any>(null);

  const [tema, setTema] = useState("");

  const [votes, setVotes] = useState<any>({});

  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(
    null,
  );

  const [javotou, setJavotou] = useState(false);

  const [votingFinalizado, setVotingFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [gerandoQuestao, setGerandoQuestao] = useState(false);

  const [loadingIndex, setLoadingIndex] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(true);

  const [copiado, setCopiado] = useState(false);

  const mockUsers = ["Gabriel", "Lucas", "Ana", "Pedro", "Maria", "João"];
  const [materias, setMaterias] = useState<{ nome: string; arquivo: string }[]>(
    [],
  );

  const [materiaSelecionada, setMateriaSelecionada] =
    useState("matematica.json");
  const [user] = useState(() => ({
    nome: mockUsers[Math.floor(Math.random() * mockUsers.length)],
  }));

  useEffect(() => {
    const adm = localStorage.getItem("adm") === "true";

    setIsAdmin(adm);
  }, []);

  useEffect(() => {
    async function verificarUsuario() {
      const user = await checkLoggedUser();

      if (!user) {
        console.log("não logado");
        redirect("/pages/SignIn");
      }
    }

    verificarUsuario();
  }, []);

  /*
   * CARREGAR QUESTÕES
   */
  useEffect(() => {
    async function carregarMaterias() {
      try {
        const response = await fetch("/questions/index.json");

        if (!response.ok) {
          throw new Error("Erro ao carregar matérias");
        }

        const data = await response.json();

        setMaterias(data);
      } catch (error) {
        console.error("Erro ao carregar matérias:", error);
      }
    }

    carregarMaterias();
  }, []);

  useEffect(() => {
    async function carregarQuestoes() {
      try {
        setCarregandoQuestoes(true);

        const response = await fetch(`/questions/${materiaSelecionada}`);

        if (!response.ok) {
          throw new Error("Erro ao carregar questões");
        }

        const data: Questao[] = await response.json();

        setQuestoes(data);
        setIndiceQuestao(0);
        setQuestion(null);
        setTema("");
        setRespostaSelecionada(null);
        setJavotou(false);
        setVotes({});
        setVotingFinalizado(false);
        setResultadoFinal(null);
      } catch (error) {
        console.error("Erro ao carregar questões:", error);
        setQuestoes([]);
      } finally {
        setCarregandoQuestoes(false);
      }
    }

    if (materiaSelecionada) {
      carregarQuestoes();
    }
  }, [materiaSelecionada]);

  /*
   * ANIMAÇÃO DE CARREGAMENTO
   */
  useEffect(() => {
    if (!gerandoQuestao) {
      setLoadingIndex(0);
      setLoadingVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setLoadingVisible(false);

      setTimeout(() => {
        setLoadingIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);

        setLoadingVisible(true);
      }, 350);
    }, 2400);

    return () => clearInterval(interval);
  }, [gerandoQuestao]);

  /*
   * SOCKET
   */
  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    /*
     * CHAT
     */
    const handleMessage = (message: string) => {
      setMessages((prev) => [...prev, message]);
    };

    /*
     * IA COMEÇOU A GERAR
     */
    const handleQuestionGenerating = () => {
      setGerandoQuestao(true);

      setQuestion(null);
      setRespostaSelecionada(null);
      setJavotou(false);

      setVotes({});
      setVotingFinalizado(false);
      setResultadoFinal(null);

      setLoadingIndex(0);
      setLoadingVisible(true);
    };

    /*
     * QUESTÃO PRONTA
     */
    const handleQuestion = (newQuestion: any) => {
      setGerandoQuestao(false);

      setQuestion(newQuestion);

      setRespostaSelecionada(null);
      setJavotou(false);

      setVotes({});

      setVotingFinalizado(false);
      setResultadoFinal(null);

      /*
       * Se a questão possuir número original,
       * sincroniza o índice local.
       */
      if (newQuestion?.numero) {
        const index = questoes.findIndex(
          (questao) => questao.numero === newQuestion.numero,
        );

        if (index !== -1) {
          setIndiceQuestao(index);
        }
      }
    };

    /*
     * VOTOS
     */
    const handleVoteUpdate = (newVotes: any) => {
      setVotes(newVotes);
    };

    /*
     * RESULTADO FINAL
     */
    const handleResultadoVotacao = (resultado: any) => {
      setVotingFinalizado(true);
      setResultadoFinal(resultado);
    };

    socket.on("message", handleMessage);
    socket.on("question-generating", handleQuestionGenerating);
    socket.on("question", handleQuestion);
    socket.on("vote-update", handleVoteUpdate);
    socket.on("resultado-votacao", handleResultadoVotacao);

    return () => {
      socket.off("message", handleMessage);
      socket.off("question-generating", handleQuestionGenerating);
      socket.off("question", handleQuestion);
      socket.off("vote-update", handleVoteUpdate);
      socket.off("resultado-votacao", handleResultadoVotacao);
    };
  }, [roomId, questoes]);

  /*
   * COPIAR CÓDIGO
   */
  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(roomId);

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 1800);
    } catch (error) {
      console.error("Erro ao copiar código:", error);
    }
  }

  /*
   * CHAT
   */
  function sendMessage() {
    if (!message.trim()) return;

    const timeStamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    socket.emit("message", {
      roomId,
      message: user.nome + ": " + message + "\n" + timeStamp,
    });

    setMessage("");
  }

  /*
   * ADAPTAR QUESTÃO
   *
   * Pega automaticamente a questão atual
   * do JSON e envia para a IA junto com o tema.
   */
  async function criarPergunta() {
    if (!isAdmin) return;

    if (!tema.trim()) return;

    if (gerandoQuestao) return;

    const questaoAtual = questoes[indiceQuestao];

    if (!questaoAtual) return;

    try {
      setGerandoQuestao(true);

      /*
       * Avisa todos da sala.
       */
      socket.emit("question-generating", {
        roomId,
      });

      console.log("Adaptando questão:", questaoAtual.numero);

      /*
       * Envia a questão original da API
       * para o endpoint da IA.
       */
      const res = await fetch("/api/gemini", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          questao: `
Questão ${questaoAtual.numero}

${questaoAtual.enunciado}

A) ${questaoAtual.alternativas.A}
B) ${questaoAtual.alternativas.B}
C) ${questaoAtual.alternativas.C}
D) ${questaoAtual.alternativas.D}
E) ${questaoAtual.alternativas.E}

Resposta correta: ${questaoAtual.resposta}
            `.trim(),

          tema,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar questão");
      }

      const data = await res.json();

      const partes = data.text.split("#");

      const modelo = data.modelo || "outro";

      const novaQuestion = {
        id: questaoAtual.id,

        numero: questaoAtual.numero,

        materia: questaoAtual.materia,

        title: partes[0]?.trim(),

        text: partes[1]?.trim(),

        respostas: partes[2]
          ?.split(/\s*§\s*/)
          .filter((a: string) => a.trim() !== ""),

        correta: Number(partes[3]?.replace("correta:", "").trim()),

        modeloIA: modelo,

        temaAdaptacao: tema,

        respostaOriginal: questaoAtual.resposta,
      };

      console.log("Questão adaptada:", novaQuestion);

      /*
       * Envia para todos.
       */
      socket.emit("question", {
        roomId,
        question: novaQuestion,
      });
    } catch (error) {
      console.error(error);

      setGerandoQuestao(false);

      socket.emit("question-error", {
        roomId,
      });
    }
  }

  function proximaQuestao() {
    if (!isAdmin) return;

    if (!votingFinalizado) return;

    if (indiceQuestao >= questoes.length - 1) {
      return;
    }

    const novoIndice = indiceQuestao + 1;

    setIndiceQuestao(novoIndice);

    setQuestion(null);

    setTema("");

    setRespostaSelecionada(null);

    setJavotou(false);

    setVotes({});

    setVotingFinalizado(false);

    setResultadoFinal(null);
  }

  /*
   * SELECIONAR RESPOSTA
   */
  function selecionarResposta(index: number) {
    if (javotou || votingFinalizado || gerandoQuestao) {
      return;
    }

    setRespostaSelecionada(index);
  }

  /*
   * CONFIRMAR RESPOSTA
   */
  function confirmarResposta() {
    if (
      respostaSelecionada === null ||
      javotou ||
      votingFinalizado ||
      gerandoQuestao
    ) {
      return;
    }

    socket.emit("vote", {
      roomId,
      answer: respostaSelecionada,
    });

    setJavotou(true);
  }

  /*
   * ADMIN:
   * FINALIZAR VOTAÇÃO
   */
  function finalizarVotacao() {
    if (!question || votingFinalizado) {
      return;
    }

    socket.emit("finalizar-votacao", {
      roomId,
    });
  }

  /*
   * SEM ROOM
   */
  if (!roomId) {
    return (
      <div className="min-h-screen bg-[#160a29] text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  /*
   * CARREGANDO QUESTÕES
   */
  if (carregandoQuestoes) {
    return (
      <div className="min-h-screen bg-[#160a29] text-white flex items-center justify-center">
        Carregando questões do ENEM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#150829] text-white flex flex-col items-center p-6">
      {/* MODAL DE COPIADO */}
      {copiado && (
        <div
          className="
            fixed
            top-5
            left-1/2
            -translate-x-1/2
            z-50
            flex
            items-center
            gap-2
            bg-[#24133f]
            border
            border-[#4b3275]
            shadow-xl
            rounded-xl
            px-4
            py-2.5
            text-sm
            text-white
          "
        >
          <img src="/favicon.ico" alt="" className="w-4 h-4" />

          <span>Copiado</span>
        </div>
      )}

      {/* TOPO */}
      <div className="w-full max-w-3xl mb-6">
        <div className="bg-[#1e1038] border border-[#332156] rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold">Sala de Chat</h1>

              <p className="text-purple-300 mt-1 text-sm">
                Converse em tempo real com seus amigos
              </p>
            </div>

            {/* CÓDIGO */}
            <div className="bg-[#2a1750] border border-[#3d2769] rounded-xl p-4">
              <p className="text-sm text-purple-300 mb-2">Código da sala</p>

              <div className="flex items-center justify-between gap-4">
                <span className="text-3xl font-bold tracking-[0.25em]">
                  {roomId}
                </span>

                <button
                  onClick={copiarCodigo}
                  className="
                    bg-white/10
                    hover:bg-white/20
                    transition
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                  "
                >
                  Copiar
                </button>
              </div>
            </div>

            {/* USER */}
            <div className="bg-[#1a0e30] border border-[#332156] rounded-xl px-4 py-3">
              <p className="text-sm text-purple-300">Você entrou como</p>

              <h2 className="text-xl font-semibold">{user.nome}</h2>
            </div>

            {/* ADMIN */}
            {isAdmin && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 rounded-xl p-3 text-sm">
                Você é o administrador da sala
              </div>
            )}

            {/* QUANTIDADE */}
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 rounded-xl p-3 text-sm">
              {questoes.length} questões de{" "}
              {materias.find((m) => m.arquivo === materiaSelecionada)?.nome ||
                "matéria"}{" "}
              carregadas{" "}
            </div>

            {/* MOCK */}
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-xl p-3 text-sm">
              Os nomes ainda estão mockados temporariamente para testes
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL ADMIN */}
      {isAdmin && (
        <div className="w-full max-w-3xl mb-6 bg-[#1e1038] border border-[#332156] rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Painel do Administrador</h2>

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

          <div className="flex flex-col gap-3">
            {/* QUESTÃO ATUAL */}
            <div className="bg-[#2a1750] border border-[#3d2769] rounded-xl p-4">
              <p className="text-sm text-purple-400">Questão atual</p>

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
              <p className="text-sm text-purple-400 mb-2">Questão original</p>

              <p className="text-sm text-purple-200 line-clamp-4">
                {questoes[indiceQuestao]?.enunciado}
              </p>
            </div>

            {/* ADAPTAR */}
            {!question && (
              <button
                onClick={criarPergunta}
                disabled={
                  gerandoQuestao || !tema.trim() || !questoes[indiceQuestao]
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
                {gerandoQuestao ? "Adaptando questão..." : "Adaptar questão"}
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
                {votingFinalizado ? "Votação finalizada" : "Finalizar votação"}
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
      )}

      {/* QUESTÃO */}
      <div className="w-full max-w-3xl mb-6 bg-[#1e1038] border border-[#332156] rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
        {/* GERANDO */}
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
              {LOADING_MESSAGES[loadingIndex]}
            </p>

            <p className="text-sm text-purple-400 mt-2">
              Aguarde enquanto a inteligência artificial adapta a questão
            </p>
          </div>
        ) : !question ? (
          /* SEM QUESTÃO */
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg text-purple-200">
              Nenhuma questão ativa no momento
            </p>

            <p className="text-sm text-purple-400 mt-2">
              O administrador deve escolher um tema e adaptar a questão
            </p>
          </div>
        ) : (
          /* QUESTÃO ATIVA */
          <div>
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-2xl font-bold">{question.title}</h2>

              <span className="text-sm text-purple-400">
                {question.materia}
              </span>
            </div>

            <p className="text-purple-200 mb-5 whitespace-pre-line">
              {question.text}
            </p>

            {/* ALTERNATIVAS */}
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

            {/* CONFIRMAR */}
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
                  {resultadoFinal.acertos} acertaram
                  {" · "}
                  {resultadoFinal.erros} erraram
                </p>
              </div>
            )}

            {/* MODELO */}
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

      {/* CHAT */}
      <div className="w-full max-w-3xl flex-1 bg-[#1e1038] border border-[#332156] rounded-2xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-[#180b2e] border-b border-[#332156] px-5 py-3">
          <h2 className="text-lg font-semibold">Chat ao vivo</h2>
        </div>

        {/* MENSAGENS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-purple-400 mt-10 text-sm">
              Nenhuma mensagem ainda...
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className="
                  bg-[#2a1750]
                  border
                  border-[#3d2769]
                  rounded-xl
                  px-4
                  py-3
                  max-w-[80%]
                "
            >
              <p className="whitespace-pre-line leading-relaxed">{msg}</p>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-[#332156] flex gap-3 bg-[#180b2e]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="
              flex-1
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
            "
            placeholder="Digite uma mensagem..."
          />

          <button
            onClick={sendMessage}
            className="
              bg-purple-600
              hover:bg-purple-500
              transition
              px-6
              rounded-xl
              font-semibold
            "
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
