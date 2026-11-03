"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

import { useQuestion } from "../../hooks/useQuestion";
import { QuestionCard } from "../../components/Adaptar";
import { checkLoggedUser } from "../../libs/auth/authservices";
import { createClient } from "@/app/libs/supabase/client";
import { Header, Footer } from "@/app/components";

const supabase = createClient();
export default function Home() {
  const {
    title,
    text,
    respostas,
    correta,
    perguntando,
    modeloIA,
    resultado,
    erro,
    limiteAtingido,
    gerarPergunta,
    verificar,
  } = useQuestion();

  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");
  const [materia] = useState("matematica");

  const [respostaEscolhida, setRespostaEscolhida] = useState<number | null>(
    null
  );

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
        .maybeSingle();

      if (error || !usuario) {
        console.error("Erro ao verificar usuário:", error);
        redirect("/pages/SignIn");
        return;
      }

      if (usuario.active === false) {
        console.log("usuário desativado");

        await supabase.auth.signOut();
        redirect("/pages/SignIn");
        return;
      }

      console.log("usuário ativo");
    }

    verificarUsuario();
  }, []);

  async function handleVerificar() {
    if (respostaEscolhida === null || resultado) return;

    await verificar(respostaEscolhida, materia);
  }

  async function handleGerar() {
    const gerou = await gerarPergunta(questao, tema, materia, "livre");

    if (gerou) {
      setRespostaEscolhida(null);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-whiteMain">
      <Header />
      <QuestionCard
        title={title}
        text={text}
        respostas={respostas}
        correta={correta}
        perguntando={perguntando}
        respostaEscolhida={respostaEscolhida}
        resultado={resultado}
        erro={erro}
        limiteAtingido={limiteAtingido}
        materia={materia}
        modeloIA={modeloIA}
        questao={questao}
        tema={tema}
        setRespostaEscolhida={setRespostaEscolhida}
        setQuestao={setQuestao}
        setTema={setTema}
        onGerar={handleGerar}
        onVerificar={handleVerificar}
      />
      <Footer />
    </div>
  );
}
