"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

import { useQuestion } from "../../hooks/useQuestion";
import QuestionCard from "../../components/QuestionCard";
import { checkLoggedUser } from "../../libs/auth/authservices";

export default function Home() {
  const {
    title,
    text,
    respostas,
    perguntando,
    modeloIA,
    gerarPergunta,
    verificar,
    limparPergunta,
  } = useQuestion();

  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");
  const [materia, setMateria] = useState("matematica");

  const [respostaEscolhida, setRespostaEscolhida] = useState(0);

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

  async function handleVerificar() {
    const acertou = await verificar(respostaEscolhida, materia);

    alert(acertou ? "Acertou" : "Errou");

    // Limpa a questão gerada
    limparPergunta();

    // Limpa os campos
    setQuestao("");
    setTema("");

    // Limpa a alternativa selecionada
    setRespostaEscolhida(0);
  }
  async function handleGerar() {
    await gerarPergunta(questao, tema, materia);
  }

  return (
    <QuestionCard
      title={title}
      text={text}
      respostas={respostas}
      perguntando={perguntando}
      respostaEscolhida={respostaEscolhida}
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
  );
}
