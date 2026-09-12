/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { io } from "socket.io-client";
import { checkLoggedUser } from "@/app/libs/auth/authservices";
import { createClient } from "@/app/libs/supabase/client";
import {
  RoomHeader,
  RoomAdminPanel,
  RoomChat,
  RoomQuestionCard,
} from "@/app/components/Room";

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
  const supabase = createClient();

  const params = useParams();

  const roomId = params.roomId as string;

  type ChatMessage = {
    uid: string;
    nome: string;
    message: string;
    timeStamp: string;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
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

  const [materias, setMaterias] = useState<{ nome: string; arquivo: string }[]>(
    [],
  );

  const [denunciaQuestaoAberta, setDenunciaQuestaoAberta] = useState(false);

  const [materiaSelecionada, setMateriaSelecionada] =
    useState("matematica.json");

  const [user, setUser] = useState({
    uid: "",
    nome: "",
  });

  useEffect(() => {
    async function getUserName() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("uid", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar nome:", error);
        return;
      }

      setUser({
        uid: user.id,
        nome: data.nome,
      });
    }

    getUserName();
  }, []);

  useEffect(() => {
    const adm = localStorage.getItem("adm") === "true";

    setIsAdmin(adm);
  }, []);

  //verfica usuario logado
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
    const handleMessage = (message: ChatMessage) => {
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

  // fazer salvar progresso
  async function salvarProgresso(materia: string, acertou: boolean) {
    type ProgressoMateria = {
      acertos: number;
      erros: number;
      total: number;
    };

    type Materia =
      | "matematica"
      | "fisica"
      | "biologia"
      | "quimica"
      | "portugues"
      | "ingles"
      | "espanhol"
      | "arte"
      | "educacao_fisica"
      | "historia"
      | "geografia"
      | "filosofia"
      | "sociologia";

    const materiaNormalizada = materia
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_") as Materia;

    const materiasValidas: Materia[] = [
      "matematica",
      "fisica",
      "biologia",
      "quimica",
      "portugues",
      "ingles",
      "espanhol",
      "arte",
      "educacao_fisica",
      "historia",
      "geografia",
      "filosofia",
      "sociologia",
    ];

    if (!materiasValidas.includes(materiaNormalizada)) {
      console.error("Matéria inválida:", materia);
      return;
    }

    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        console.error("Usuário não está logado.");
        return;
      }

      const { data: progresso, error: buscaError } = await supabase
        .from("progresso_usuario")
        .select("*")
        .eq("uid", authUser.id)
        .maybeSingle();

      if (buscaError) {
        console.error("Erro ao buscar progresso:", buscaError);
        return;
      }

      const atual: ProgressoMateria = progresso?.[materiaNormalizada] ?? {
        acertos: 0,
        erros: 0,
        total: 0,
      };

      const novoProgresso: ProgressoMateria = {
        acertos: atual.acertos + (acertou ? 1 : 0),
        erros: atual.erros + (acertou ? 0 : 1),
        total: atual.total + 1,
      };

      if (progresso) {
        const { error: updateError } = await supabase
          .from("progresso_usuario")
          .update({
            [materiaNormalizada]: novoProgresso,
          })
          .eq("uid", authUser.id);

        if (updateError) {
          console.error("Erro ao atualizar progresso:", updateError);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("progresso_usuario")
          .insert({
            uid: authUser.id,
            [materiaNormalizada]: novoProgresso,
          });

        if (insertError) {
          console.error("Erro ao criar progresso:", insertError);
          return;
        }
      }

      console.log("Progresso salvo:", {
        materia: materiaNormalizada,
        acertou,
        progresso: novoProgresso,
      });
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  }

  /*
   * CHAT
   */
  function sendMessage(message: string) {
    if (!message.trim()) return;

    const timeStamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    socket.emit("message", {
      roomId,
      uid: user.uid,
      nome: user.nome,
      message,
      timeStamp,
    });
  }

  /*
   * ADAPTAR QUESTÃO
   *
   * Pega automaticamente a questão atual
   * do JSON e envia para a IA junto com o tema.
   */

  async function salvarTema() {
    const temaLimpo = tema.trim();

    if (!temaLimpo) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("Usuário não está logado.");
      return;
    }

    const { data, error } = await supabase
      .from("temas_usuarios")
      .insert({ uid: user.id, tema: temaLimpo });
    if (!user) {
      console.error("Usuário não está logado.");
      return;
    }
  }

  async function criarPergunta() {
    if (!isAdmin) return;

    if (!tema.trim()) return;

    if (gerandoQuestao) return;

    const questaoAtual = questoes[indiceQuestao];

    if (!questaoAtual) return;

    try {
      setGerandoQuestao(true);

      await salvarTema();

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

      const respostas = partes[2]
        ?.split(/\s*§\s*/)
        .map((a: string) => a.trim())
        .filter((a: string) => a !== "");

      const respostaIA = partes[3]
        ?.replace(/correta\s*:/i, "")
        .trim()
        .toUpperCase();

      const mapaRespostas: Record<string, number> = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
      };

      let correta: number;

      if (/^[1-5]$/.test(respostaIA)) {
        correta = Number(respostaIA) - 1;
      } else if (respostaIA in mapaRespostas) {
        // IA retornou a letra
        correta = mapaRespostas[respostaIA];
      } else {
        console.error("Resposta correta inválida recebida da IA:", partes[4]);
        throw new Error("A IA retornou uma resposta correta inválida.");
      }

      const novaQuestion = {
        id: questaoAtual.id,

        numero: questaoAtual.numero,

        materia: questaoAtual.materia,

        title: partes[0]?.trim(),

        text: partes[1]?.trim(),

        respostas,

        correta,

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
  async function confirmarResposta() {
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
    console.log("Resposta selecionada:", respostaSelecionada);
    console.log("Resposta correta:", question.correta);
    console.log("Acertou:", respostaSelecionada === question.correta);
    const acertou = respostaSelecionada === question.correta;

    await salvarProgresso(question.materia, acertou);

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
      <div className="min-h-screen bg-blueMain text-white flex items-center justify-center">
        Carregando questões do ENEM...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-whiteMain text-white flex flex-col items-center">
      <RoomHeader 
        roomId={roomId} 
        userName={user.nome}
      />

      <main className="w-full px-4 py-6">
        
        {isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

          {/* PAINEL ADMIN */}
          <div className="sticky top-6 self-start">
            <RoomAdminPanel
              materias={materias}
              materiaSelecionada={materiaSelecionada}
              setMateriaSelecionada={setMateriaSelecionada}
              gerandoQuestao={gerandoQuestao}
              question={question}
              questoes={questoes}
              indiceQuestao={indiceQuestao}
              tema={tema}
              setTema={setTema}
              criarPergunta={criarPergunta}
              finalizarVotacao={finalizarVotacao}
              proximaQuestao={proximaQuestao}
              votingFinalizado={votingFinalizado}
            />
          </div>
          
          <div className="flex flex-col gap-6">
            {/* QUESTÃO */}
            <RoomQuestionCard
              question={question}
              gerandoQuestao={gerandoQuestao}
              loadingIndex={loadingIndex}
              loadingVisible={loadingVisible}
              loadingMessages={LOADING_MESSAGES}
              denunciaQuestaoAberta={denunciaQuestaoAberta}
              setDenunciaQuestaoAberta={setDenunciaQuestaoAberta}
              respostaSelecionada={respostaSelecionada}
              selecionarResposta={selecionarResposta}
              confirmarResposta={confirmarResposta}
              votes={votes}
              javotou={javotou}
              votingFinalizado={votingFinalizado}
              resultadoFinal={resultadoFinal}
            />

            {/* CHAT */}
            <RoomChat messages={messages} onSendMessage={sendMessage} />
          </div>
        </div>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {/* QUESTÃO */}
            <RoomQuestionCard
              question={question}
              gerandoQuestao={gerandoQuestao}
              loadingIndex={loadingIndex}
              loadingVisible={loadingVisible}
              loadingMessages={LOADING_MESSAGES}
              denunciaQuestaoAberta={denunciaQuestaoAberta}
              setDenunciaQuestaoAberta={setDenunciaQuestaoAberta}
              respostaSelecionada={respostaSelecionada}
              selecionarResposta={selecionarResposta}
              confirmarResposta={confirmarResposta}
              votes={votes}
              javotou={javotou}
              votingFinalizado={votingFinalizado}
              resultadoFinal={resultadoFinal}
            />

            {/* CHAT */}
            <RoomChat messages={messages} onSendMessage={sendMessage} />
          </div>
          )}

      </main>
    </div>
  )
};

