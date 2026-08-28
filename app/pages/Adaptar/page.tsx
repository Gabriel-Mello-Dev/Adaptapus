/* eslint-disable @next/next/no-async-client-component */
"use client";
import { useState } from "react";
import {useEffect} from 'react';
import {redirect} from "next/navigation";
import { useQuestion } from "../../hooks/useQuestion";
import QuestionCard from "../../components/QuestionCard";

import {checkLoggedUser} from '../../libs/auth/authservices';
import router from "next/router";

 export default function Home() {
  const { title, text, respostas, perguntando, gerarPergunta, verificar } =
    useQuestion();

  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");
  const [respostaEscolhida, setRespostaEscolhida] = useState(0);

useEffect(() => {
    async function verificarUsuario() {
      const user = await checkLoggedUser();

      if (!user) {
        console.log("não logado")
        redirect("/pages/SignIn");
      }
    }

    verificarUsuario();
  }, [router]);

  return (
    <QuestionCard
      title={title}
      text={text}
      respostas={respostas}
      perguntando={perguntando}
      respostaEscolhida={respostaEscolhida}
      setRespostaEscolhida={setRespostaEscolhida}
      setQuestao={setQuestao}
      setTema={setTema}
      onGerar={() => gerarPergunta(questao, tema)}
      onVerificar={() => {
        alert(verificar(respostaEscolhida) ? "Acertou" : "Errou");
      }}
    />
  );
}
