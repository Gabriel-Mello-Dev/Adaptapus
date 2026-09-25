/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { redirect, useParams } from "next/navigation";
import { io } from "socket.io-client";
import { checkLoggedUser } from "@/app/libs/auth/authservices";
import { createClient } from "@/app/libs/supabase/client";
import {
  RoomHeader,
  RoomAdminPanel,
  RoomChat,
  RoomQuestionCard,
  RoomSvgs,
} from "@/app/components/Room";

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
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

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

  /*
   * Indica que a IA não conseguiu adaptar a questão.
   */
  const [erroAdaptacao, setErroAdaptacao] = useState(false);

  const [votingFinalizado, setVotingFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [gerandoQuestao, setGerandoQuestao] = useState(false);

  const [loadingIndex, setLoadingIndex] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(true);

  const [usuariosOnline, setUsuariosOnline] = useState<
    {
      uid: string;
      nome: string;
      socketId: string;
    }[]
  >([]);

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

  /*
   * SOCKET
   */
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!);

    socketRef.current = newSocket;

    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, []);

  /*
   * BUSCAR USUÁRIO
   */
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

  /*
   * VERIFICAR ADMIN
   */
  useEffect(() => {
    const adm = localStorage.getItem("adm") === "true";

    setIsAdmin(adm);
  }, []);

  /*
   * VERIFICAR USUÁRIO LOGADO
   */
  useEffect(() => {
    async function verificarUsuario() {
      const user = await checkLoggedUser();

      if (!user) {
        console.log("não logado");
        redirect("/pages/SignIn");
        return;
      }

      const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("active")
        .eq("uid", user.id)
        .single();

      if (error || !usuario) {
        console.log("usuário não encontrado");
        redirect("/pages/SignIn");
        return;
      }

      if (usuario.active === false) {
        console.log("usuário desativado");

        await supabase.auth.signOut();

        redirect("/pages/SignIn");
        return;
      }
    }

    verificarUsuario();
  }, []);

  /*
   * CARREGAR MATÉRIAS
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

  /*
   * CARREGAR QUESTÕES
   */
  useEffect(() => {
    async function carregarQuestoes() {
      try {
        setCarregandoQuestoes(true);

        const response = await fetch(`/questions/${materiaSelecionada}`);

        if (!response.ok) {
          throw new Error(`Erro ao carregar questões: ${response.status}`);
        }

        const data = await response.json();

        setQuestoes(data);
        setIndiceQuestao(0);
      } catch (error) {
        console.error("Erro ao carregar questões:", error);

        setQuestoes([]);
      } finally {
        setCarregandoQuestoes(false);
      }
    }

    carregarQuestoes();
  }, [materiaSelecionada]);

  /*
   * SOCKET DA SALA
   */
  useEffect(() => {
    if (!roomId || !user.uid) return;

    const socket = socketRef.current;

    if (!socket) return;

    /*
     * CHAT
     */
    const handleMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    /*
     * USUÁRIOS ONLINE
     */
    const handleUsersOnline = (
      usuarios: {
        uid: string;
        nome: string;
        socketId: string;
      }[],
    ) => {
      setUsuariosOnline(usuarios);
    };

    /*
     * IA COMEÇOU A GERAR
     */
    const handleQuestionGenerating = () => {
      setGerandoQuestao(true);

      /*
       * Remove qualquer erro anterior.
       */
      setErroAdaptacao(false);

      /*
       * Remove a questão anterior enquanto a nova é gerada.
       */
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

      /*
       * Se uma questão foi gerada com sucesso,
       * remove qualquer mensagem de erro.
       */
      setErroAdaptacao(false);

      setQuestion(newQuestion);

      setRespostaSelecionada(null);
      setJavotou(false);

      setVotes({});

      setVotingFinalizado(false);
      setResultadoFinal(null);

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
     * ERRO AO ADAPTAR QUESTÃO
     */
    const handleQuestionError = () => {
      console.error("Não foi possível adaptar a questão.");

      setGerandoQuestao(false);

      /*
       * Ativa a mensagem de erro.
       */
      setErroAdaptacao(true);

      /*
       * Não deixa aparecer a questão anterior.
       */
      setQuestion(null);

      setRespostaSelecionada(null);
      setJavotou(false);

      setVotes({});
      setVotingFinalizado(false);
      setResultadoFinal(null);
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

    /*
     * REGISTRAR LISTENERS
     */
    socket.on("message", handleMessage);

    socket.on("users-online", handleUsersOnline);

    socket.on("question-generating", handleQuestionGenerating);

    socket.on("question", handleQuestion);

    socket.on("question-error", handleQuestionError);

    socket.on("vote-update", handleVoteUpdate);

    socket.on("resultado-votacao", handleResultadoVotacao);

    /*
     * ENTRAR NA SALA
     */
    socket.emit("join-room", {
      roomId,
      uid: user.uid,
      nome: user.nome,
    });

    /*
     * LIMPAR LISTENERS
     */
    return () => {
      socket.off("message", handleMessage);

      socket.off("users-online", handleUsersOnline);

      socket.off("question-generating", handleQuestionGenerating);

      socket.off("question", handleQuestion);

      socket.off("question-error", handleQuestionError);

      socket.off("vote-update", handleVoteUpdate);

      socket.off("resultado-votacao", handleResultadoVotacao);

      /*
       * Não desconectar aqui.
       * O socket é global.
       */
    };
  }, [roomId, questoes, user.uid, user.nome]);

  /*
   * SALVAR PROGRESSO
   */
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

    socketRef.current?.emit("message", {
      roomId,
      uid: user.uid,
      nome: user.nome,
      message,
      timeStamp,
    });
  }

  /*
   * SALVAR TEMA
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

    const { error } = await supabase.from("temas_usuarios").insert({
      uid: user.id,
      tema: temaLimpo,
    });

    if (error) {
      console.error("Erro ao salvar tema:", error);
    }
  }

  /*
   * ADAPTAR QUESTÃO
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
       * Remove erro anterior.
       */
      setErroAdaptacao(false);

      await salvarTema();

      /*
       * Avisa todos da sala.
       */
      socketRef.current?.emit("question-generating", {
        roomId,
      });

      console.log("Adaptando questão:", questaoAtual.numero);

      /*
       * Envia a questão original para a IA.
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

      if (!data.text) {
        throw new Error("A IA não retornou uma questão.");
      }

      /*
       * Divide a resposta da IA.
       *
       * 0 = título
       * 1 = texto
       * 2 = alternativas
       * 3 = resposta correta
       */
      const partes = data.text.split("#");

      if (partes.length < 4) {
        throw new Error("Formato de resposta da IA inválido.");
      }

      const modelo = data.modelo || "outro";

      /*
       * Alternativas.
       */
      const respostas = partes[2]
        ?.split(/\s*§\s*/)
        .map((a: string) => a.trim())
        .filter((a: string) => a !== "");

      /*
       * Validação das alternativas.
       */
      if (!respostas || respostas.length !== 5) {
        throw new Error("A IA não retornou exatamente 5 alternativas.");
      }

      /*
       * Resposta correta.
       */
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

      /*
       * Caso a IA retorne 1-5,
       * converte para índice 0-4.
       */
      if (/^[1-5]$/.test(respostaIA)) {
        correta = Number(respostaIA);
      } else if (respostaIA in mapaRespostas) {
        correta = mapaRespostas[respostaIA];
      } else {
        console.error("Resposta correta inválida recebida da IA:", partes[3]);

        throw new Error("A IA retornou uma resposta correta inválida.");
      }

      /*
       * Questão adaptada.
       */
      const novaQuestion = {
        id: questaoAtual.id,

        numero: questaoAtual.numero,

        materia: questaoAtual.materia,

        title: partes[0]?.trim(),

        text: partes[1]?.trim(),

        respostas,

        correta,

        modeloIA: modelo,

        temaAdaptacao: tema.trim(),

        respostaOriginal: questaoAtual.resposta,
      };

      console.log("Questão adaptada:", novaQuestion);

      /*
       * Envia a questão para todos.
       */
      socketRef.current?.emit("question", {
        roomId,
        question: novaQuestion,
      });
    } catch (error) {
      console.error("Erro ao adaptar questão:", error);

      setGerandoQuestao(false);

      /*
       * Avisa todos da sala que a adaptação falhou.
       */
      socketRef.current?.emit("question-error", {
        roomId,
      });
    }
  }

  /*
   * PRÓXIMA QUESTÃO
   */
  function proximaQuestao() {
    if (!isAdmin) return;

    if (!votingFinalizado) return;

    if (indiceQuestao >= questoes.length - 1) {
      return;
    }

    const novoIndice = indiceQuestao + 1;

    setIndiceQuestao(novoIndice);

    setQuestion(null);

    setErroAdaptacao(false);

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
    if (javotou || votingFinalizado || gerandoQuestao || erroAdaptacao) {
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
      gerandoQuestao ||
      erroAdaptacao ||
      !question
    ) {
      return;
    }

    socketRef.current?.emit("vote", {
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

    socketRef.current?.emit("finalizar-votacao", {
      roomId,
    });
  }

  /*
   * SEM ROOM
   */
  if (!roomId) {
    return (
      <div className="min-h-screen bg-blueMain text-white flex items-center justify-center">
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
        usuariosOnline={usuariosOnline}
      />

      <main className="w-full px-4 py-6 relative">

        <RoomSvgs />

        <div className="relative z-10">
          {isAdmin ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* PAINEL ADMIN */}
              <div className=" lg:sticky top-6 self-start">
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
                  erroAdaptacao={erroAdaptacao}
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
                erroAdaptacao={erroAdaptacao}
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
        </div>
      </main>
    </div>
  );
}
