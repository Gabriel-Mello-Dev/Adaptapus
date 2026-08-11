/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

import { useQuestion } from "../../../../hooks/useQuestion";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!);

// Variações de texto exibidas ENQUANTO a IA está gerando a questão
const LOADING_MESSAGES = [
  "Adaptando sua questão...",
  "Questão sendo adaptada...",
  "Ajustando as alternativas...",
  "Quase pronto...",
];

export default function ChatPage() {
  const params = useParams();

  const roomId = params.roomId as string;
  const [modeloIA, setModeloIA] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [tema, setTema] = useState("");
  const [questao, setQuestao] = useState("");
  const [votes, setVotes] = useState<any>({});
  const [gerandoQuestao, setGerandoQuestao] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(
    null,
  );
  const [javotou, setJavotou] = useState(false);

  // VOTAÇÃO FINALIZADA
  const [votingFinalizado, setVotingFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);

  const mockUsers = ["Gabriel", "Lucas", "Ana", "Pedro", "Maria", "João"];

  // USER FIXO
  const [user] = useState(() => ({
    nome: mockUsers[Math.floor(Math.random() * mockUsers.length)],
  }));

  // ADMIN
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adm = localStorage.getItem("adm") === "true";

    setIsAdmin(adm);
  }, []);

  // HOOK DA QUESTÃO
  const { perguntando } = useQuestion();

  // TEXTO DE CARREGAMENTO (fade in/out ENQUANTO está gerando a questão)
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    if (!gerandoQuestao) return;

    const interval = setInterval(() => {
      setLoadingVisible(false);

      const troca = setTimeout(() => {
        setLoadingIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        setLoadingVisible(true);
      }, 350);

      return () => clearTimeout(troca);
    }, 2400);

    return () => clearInterval(interval);
  }, [gerandoQuestao]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("question", (question) => {
      setQuestion(question);
      setRespostaSelecionada(null);
      setJavotou(false);
      setVotes({});
      setVotingFinalizado(false);
      setResultadoFinal(null);
    });

    socket.on("vote-update", (votes) => {
      setVotes(votes);
    });

    socket.on("resultado-votacao", (resultado) => {
      setVotingFinalizado(true);
      setResultadoFinal(resultado);
    });

    return () => {
      socket.off("message");
      socket.off("question");
      socket.off("vote-update");
      socket.off("resultado-votacao");
    };
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="min-h-screen bg-[#160a29] text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  // CHAT
  function sendMessage() {
    if (!message.trim()) return;

    const timeStamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    socket.emit("message", {
      roomId,
      message: user.nome + ": " + message + "\n🕒 " + timeStamp,
    });

    setMessage("");
  }

  // GERAR QUESTÃO (só roda quando o admin clica no botão)
  async function criarPergunta() {
    if (!tema.trim()) return;
    if (!questao.trim()) return;

    try {
      setGerandoQuestao(true);
      console.log("Adaptando questão...");

      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({
          questao,
          tema,
        }),
      });

      const data = await res.json();

      const partes = data.text.split("#");
      setModeloIA(data.modelo || "outro");

      const question = {
        title: partes[0]?.trim(),
        text: partes[1]?.trim(),
        respostas: partes[2]
          ?.split(/\s*§\s*/)
          .filter((a: string) => a.trim() !== ""),
        correta: Number(partes[3]?.replace("correta:", "").trim()),
      };
      console.log("questão:", question);

      socket.emit("question", {
        roomId,
        question,
      });
    } catch (error) {
      console.error(error);
      console.log("adaptar questão deu errado");
    } finally {
      setGerandoQuestao(false);
    }
  }

  function selecionarResposta(index: number) {
    if (javotou || votingFinalizado) return;

    setRespostaSelecionada(index);
  }

  // Responder
  function confirmarResposta() {
    if (respostaSelecionada === null || votingFinalizado) return;

    socket.emit("vote", {
      roomId,
      answer: respostaSelecionada,
    });

    setJavotou(true);
  }

  // ADMIN: finalizar votação e revelar resultado
  function finalizarVotacao() {
    if (!question || votingFinalizado) return;

    socket.emit("finalizar-votacao", { roomId });
  }

  return (
    <div className="min-h-screen bg-[#150829] text-white flex flex-col items-center p-6">
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
                  onClick={() => navigator.clipboard.writeText(roomId)}
                  className="bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-lg text-sm font-medium"
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

          <div className="flex flex-col gap-3">
            {/* TEMA */}
            <input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Tema da adaptação"
              className="
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
            />

            {/* QUESTÃO */}
            <textarea
              value={questao}
              onChange={(e) => setQuestao(e.target.value)}
              rows={10}
              placeholder={`Cole a questão aqui

Exemplo:

Qual a capital da França?
A) Berlim
B) Paris
C) Roma
D) Lisboa`}
              className="
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
                resize-none
                whitespace-pre-wrap
              "
            />

            <button
              onClick={criarPergunta}
              disabled={gerandoQuestao}
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

            {/* FINALIZAR VOTAÇÃO */}
            {question && (
              <button
                onClick={finalizarVotacao}
                disabled={votingFinalizado}
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
          </div>
        </div>
      )}

      {/* QUESTÃO — sempre visível */}
      <div className="w-full max-w-3xl mb-6 bg-[#1e1038] border border-[#332156] rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
        {gerandoQuestao ? (
          // Só mostra o texto animado ENQUANTO está gerando
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p
              className={`text-lg text-purple-200 transition-opacity duration-300 ${
                loadingVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {LOADING_MESSAGES[loadingIndex]}
            </p>
            <p className="text-sm text-purple-400 mt-2">
              Aguardando a próxima pergunta da sala
            </p>
          </div>
        ) : !question ? (
          // Estado ocioso: nenhuma questão foi pedida ainda
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-lg text-purple-200">
              Nenhuma questão ativa no momento
            </p>
            <p className="text-sm text-purple-400 mt-2">
              Aguardando o administrador iniciar uma questão
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-3">{question.title}</h2>

            <p className="text-purple-200 mb-5">{question.text}</p>

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
                    disabled={votingFinalizado}
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
                    {resposta} ({votes[index] || 0} votos)
                  </button>
                );
              })}
            </div>

            <button
              onClick={confirmarResposta}
              disabled={respostaSelecionada === null || javotou || votingFinalizado}
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

            {/* RESULTADO DA VOTAÇÃO */}
            {votingFinalizado && resultadoFinal && (
              <div
                className={`mt-4 p-4 rounded-xl border ${
                  resultadoFinal.maioriaAcertou
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                    : "bg-red-500/10 border-red-500/30 text-red-200"
                }`}
              >
                <p className="font-semibold text-lg mb-1">
                  {resultadoFinal.maioriaAcertou
                    ? "A maioria da sala acertou! 🎉"
                    : "A maioria da sala errou! 😬"}
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
                <span className="text-purple-300/80">{modeloIA}</span>
              </p>
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
              className="bg-[#2a1750] border border-[#3d2769] rounded-xl px-4 py-3 max-w-[80%]"
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