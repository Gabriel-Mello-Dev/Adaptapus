/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

import { useQuestion } from "../../../../hooks/useQuestion";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!);

export default function ChatPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [tema, setTema] = useState("");
  const [questao, setQuestao] = useState("");
  const [votes, setVotes] = useState<any>({});
  const [gerandoQuestao, setGerandoQuestao] = useState(false);
  const [javotou, setJavotou] = useState(false);
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

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("question", (question) => {
      setQuestion(question);
    });

    socket.on("vote-update", (votes) => {
      setVotes(votes);
    });

    return () => {
      socket.off("message");
      socket.off("question");
      socket.off("vote-update");
    };
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="min-h-screen bg-purple-950 text-white flex items-center justify-center">
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

  // GERAR QUESTÃO
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
      const question = {
        title: partes[0]?.trim(),

        text: partes[1]?.trim(),

        respostas: partes[2]?.split("§").map((a: string) => a.trim()),

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

  //Responder
  function responder(index: number) {
    if (javotou) {
      return;
    }

    socket.emit("vote", {
      roomId,
      answer: index,
    });
    setJavotou(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-950 text-white flex flex-col items-center p-6">
      {/* TOPO */}
      <div className="w-full max-w-5xl mb-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-black">Sala de Chat</h1>

              <p className="text-purple-200 mt-1">
                Converse em tempo real com seus amigos
              </p>
            </div>

            {/* CÓDIGO */}
            <div className="bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-2xl p-5 shadow-lg">
              <p className="text-sm text-purple-100 mb-2">Código da sala</p>

              <div className="flex items-center justify-between gap-4">
                <span className="text-4xl font-black tracking-[0.3em]">
                  {roomId}
                </span>

                <button
                  onClick={() => navigator.clipboard.writeText(roomId)}
                  className="bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-xl font-semibold"
                >
                  Copiar
                </button>
              </div>
            </div>

            {/* USER */}
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <p className="text-sm text-purple-300">Você entrou como</p>

              <h2 className="text-2xl font-bold">{user.nome}</h2>
            </div>

            {/* ADMIN */}
            {isAdmin && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-200 rounded-2xl p-4 text-sm">
                👑 Você é o administrador da sala
              </div>
            )}

            {/* MOCK */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-2xl p-4 text-sm">
              ⚠️ Os nomes ainda estão mockados temporariamente para testes
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO ADMIN */}
      {isAdmin && (
        <div className="w-full max-w-5xl mb-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-black mb-5">Painel do Administrador</h2>

          <div className="flex flex-col gap-4">
            {/* TEMA */}
            <input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Tema da adaptação"
              className="
          bg-white/10
          border
          border-white/10
          text-white
          placeholder:text-purple-300
          px-5
          py-4
          rounded-2xl
          outline-none
          focus:ring-2
          focus:ring-purple-400
          text-lg
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
          bg-white/10
          border
          border-white/10
          text-white
          placeholder:text-purple-300
          px-5
          py-4
          rounded-2xl
          outline-none
          focus:ring-2
          focus:ring-purple-400
          text-lg
          resize-none
          whitespace-pre-wrap
        "
            />

            <button
              onClick={criarPergunta}
              className="
          bg-gradient-to-r
          from-yellow-500
          to-orange-500
          py-4
          rounded-2xl
          font-bold
          text-lg
          shadow-xl
          hover:scale-[1.02]
          transition-all
        "
            >
              {gerandoQuestao ? "Adaptando questão..." : "Adaptar Questão"}{" "}
            </button>
          </div>
        </div>
      )}

      {/* QUESTÃO */}
      {question && (
        <div className="w-full max-w-5xl mb-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-3xl font-black mb-4">{question.title}</h2>

          <p className="text-lg text-purple-100 mb-6">{question.text}</p>

          <div className="space-y-3">
            {question.respostas?.map((resposta: string, index: number) => (
              <button
                key={index}
                onClick={() => responder(index)}
                className="
        w-full
        text-left
        bg-white/10
        hover:bg-white/20
        border
        border-white/10
        transition-all
        p-4
        rounded-2xl
        text-lg
      "
              >
                {resposta}
                ({votes[index] || 0} votos )
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CHAT */}
      <div className="w-full max-w-5xl flex-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-black/20 border-b border-white/10 px-6 py-4">
          <h2 className="text-2xl font-bold">Chat ao vivo</h2>
        </div>

        {/* MENSAGENS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-purple-300 mt-10">
              Nenhuma mensagem ainda...
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 max-w-[80%] shadow-lg"
            >
              <p className="whitespace-pre-line text-lg leading-relaxed">
                {msg}
              </p>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10 flex gap-3 bg-black/10">
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
              bg-white/10
              border
              border-white/10
              text-white
              placeholder:text-purple-300
              px-5
              py-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-purple-400
              text-lg
            "
            placeholder="Digite uma mensagem..."
          />

          <button
            onClick={sendMessage}
            className="
              bg-gradient-to-r
              from-purple-500
              to-fuchsia-500
              hover:scale-105
              transition-all
              px-8
              rounded-2xl
              font-bold
              text-lg
              shadow-lg
            "
          >
            Enviar 
          </button>
        </div>
      </div>
    </div>
  );
}
