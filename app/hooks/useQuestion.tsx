"use client";

import { useState } from "react";
import { createClient } from "@/app/libs/supabase/client";

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

export function useQuestion() {
  const supabase = createClient();

  const [title, setTitle] = useState("titulo");
  const [text, setText] = useState("corpo da pergunta");
  const [respostas, setRespostas] = useState<string[]>([]);
  const [correta, setCorreta] = useState(0);
  const [perguntando, setPerguntando] = useState(false);
  const [modeloIA, setModeloIA] = useState("outro");

  async function salvarTema(tema: string) {
    const temaLimpo = tema.trim();

    if (!temaLimpo) return;

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
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
    } catch (error) {
      console.error("Erro ao salvar tema:", error);
    }
  }

  async function salvarProgresso(materia: string, acertou: boolean) {
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
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Usuário não está logado.");
        return;
      }

      const { data: progresso, error: buscaError } = await supabase
        .from("progresso_usuario")
        .select("*")
        .eq("uid", user.id)
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
        const { error } = await supabase
          .from("progresso_usuario")
          .update({
            [materiaNormalizada]: novoProgresso,
          })
          .eq("uid", user.id);

        if (error) {
          console.error("Erro ao atualizar progresso:", error);
          return;
        }
      } else {
        const { error } = await supabase.from("progresso_usuario").insert({
          uid: user.id,
          [materiaNormalizada]: novoProgresso,
        });

        if (error) {
          console.error("Erro ao criar progresso:", error);
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

  async function gerarPergunta(questao: string, tema: string, materia: string) {
    try {
      setPerguntando(true);

      await salvarTema(tema);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questao,
          tema,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar pergunta");
      }

      const data = await res.json();

      const modelo = data.modelo || "outro";
      setModeloIA(modelo);

      const partes = data.text.split("#");

      const alternativas = partes[2]
        ?.split("§")
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

      let respostaCorreta: number;

      if (/^[1-5]$/.test(respostaIA)) {
        respostaCorreta = Number(respostaIA) - 1;
      } else if (respostaIA in mapaRespostas) {
        respostaCorreta = mapaRespostas[respostaIA];
      } else {
        throw new Error(`Resposta correta inválida: ${partes[3]}`);
      }

      setTitle(partes[0]?.trim() || "");
      setText(partes[1]?.trim() || "");
      setRespostas(alternativas || []);
      setCorreta(respostaCorreta);
    } catch (error) {
      console.error("Erro ao gerar pergunta:", error);
    } finally {
      setPerguntando(false);
    }
  }

  async function verificar(escolhida: number, materia: string) {
    const acertou = escolhida === correta;

    await salvarProgresso(materia, acertou);

    return acertou;
  }
  function limparPergunta() {
    setTitle("");
    setText("");
    setRespostas([]);
    setCorreta(0);
    setModeloIA("outro");
  }
  return {
    title,
    text,
    respostas,
    correta,
    perguntando,
    gerarPergunta,
    verificar,
    salvarTema,
    modeloIA,
    salvarProgresso,
    limparPergunta,
  };
}
