"use client";

import { useRef, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";

type ProgressoMateria = {
  acertos: number;
  erros: number;
  total: number;
};

type TipoAdaptacao = "enem" | "livre";

export type ResultadoResposta = {
  acertou: boolean;
  escolhida: number;
  correta: number;
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

function limparTextoIA(texto: string) {
  return texto
    .trim()
    .replace(/^```[a-zA-Z]*\s*/, "")
    .replace(/\s*```$/, "")
    .trim()
    .replace(/^["'“”]+|["'“”]+$/g, "")
    .trim();
}

function separarQuestao(texto: string) {
  const limpo = limparTextoIA(texto);

  const ultimoHash = limpo.lastIndexOf("#");

  if (ultimoHash === -1) {
    throw new Error(
      "A IA não retornou o campo da resposta correta no formato esperado."
    );
  }

  const cabecalho = limpo.slice(0, ultimoHash).trim();
  const respostaBruta = limpo.slice(ultimoHash + 1).trim();

  const primeiroHash = cabecalho.indexOf("#");

  if (primeiroHash === -1) {
    throw new Error(
      "A IA não retornou o separador entre o título e o enunciado."
    );
  }

  const titulo = cabecalho.slice(0, primeiroHash).trim();
  const restante = cabecalho.slice(primeiroHash + 1);

  const segundoHash = restante.indexOf("#");

  if (segundoHash === -1) {
    throw new Error(
      "A IA não retornou o separador entre o enunciado e as alternativas."
    );
  }

  const enunciado = restante.slice(0, segundoHash).trim();
  const alternativasTexto = restante.slice(segundoHash + 1).trim();

  if (!titulo) {
    throw new Error("A IA não retornou o título da questão.");
  }

  if (!enunciado) {
    throw new Error("A IA não retornou o enunciado da questão.");
  }

  if (!alternativasTexto) {
    throw new Error("A IA não retornou alternativas.");
  }

  const alternativas = alternativasTexto
    .split("§")
    .map((alternativa) => alternativa.trim())
    .filter((alternativa) => alternativa !== "");

  return { titulo, enunciado, alternativas, respostaBruta };
}

function interpretarRespostaCorreta(valor: string, totalAlternativas: number) {
  const limpo = valor
    .replace(/resposta\s*correta\s*:?/gi, "")
    .replace(/\bcorreta\s*:?/gi, "")
    .trim()
    .toUpperCase();

  const numero = limpo.match(/\b(\d+)\b/);

  if (numero) {
    const indice = Number(numero[1]);

    if (indice >= 0 && indice < totalAlternativas) {
      return indice;
    }

    throw new Error(
      `A IA indicou o índice ${indice} como resposta correta, mas a questão possui ${totalAlternativas} alternativas (índices de 0 a ${
        totalAlternativas - 1
      }).`
    );
  }

  const letra = limpo.match(/\b([A-Z])\b/);

  if (letra) {
    const indice = letra[1].charCodeAt(0) - 65;

    if (indice >= 0 && indice < totalAlternativas) {
      return indice;
    }

    throw new Error(
      `A IA indicou a alternativa ${letra[1]} como correta, mas essa alternativa não existe na questão.`
    );
  }

  throw new Error(
    `A IA não informou uma resposta correta válida: ${
      valor.trim() || "campo vazio"
    }.`
  );
}

export function useQuestion() {
  const supabase = createClient();

  const [title, setTitle] = useState("titulo");
  const [text, setText] = useState("corpo da pergunta");
  const [respostas, setRespostas] = useState<string[]>([]);
  const [correta, setCorreta] = useState(0);
  const [perguntando, setPerguntando] = useState(false);
  const [modeloIA, setModeloIA] = useState("outro");
  const [resultado, setResultado] = useState<ResultadoResposta | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const respondidaRef = useRef(false);

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

  async function gerarPergunta(
    questao: string,
    tema: string,
    materia: string,
    tipoAdaptacao: TipoAdaptacao = "enem"
  ) {
    try {
      setPerguntando(true);
      setErro(null);

      const tipoFinal: TipoAdaptacao =
        tipoAdaptacao === "livre" ? "livre" : "enem";

      await salvarTema(tema);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questao,
          tema,
          materia,
          tipoAdaptacao: tipoFinal,
        }),
      });

      const data = (await res.json()) as {
        text?: unknown;
        modelo?: unknown;
        error?: unknown;
      };

      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" && data.error.trim()
            ? data.error
            : `Erro ao gerar pergunta (HTTP ${res.status}).`
        );
      }

      if (typeof data.text !== "string" || !data.text.trim()) {
        throw new Error("A IA não retornou o texto da questão.");
      }

      console.log("Retorno completo da API:", data);

      const { titulo, enunciado, alternativas, respostaBruta } =
        separarQuestao(data.text);

      // O modo ENEM mantém exatamente cinco alternativas.
      // O modo livre aceita a quantidade devolvida pela IA.
      if (tipoFinal === "enem" && alternativas.length !== 5) {
        throw new Error(
          `Questão ENEM deve ter exatamente 5 alternativas. Recebidas: ${alternativas.length}.`
        );
      }

      if (tipoFinal === "livre" && alternativas.length < 2) {
        throw new Error(
          `A IA retornou apenas ${alternativas.length} alternativa(s). São necessárias pelo menos 2.`
        );
      }

      const respostaCorreta = interpretarRespostaCorreta(
        respostaBruta,
        alternativas.length
      );

      const modelo =
        typeof data.modelo === "string" && data.modelo.trim()
          ? data.modelo
          : "outro";

      setTitle(titulo);
      setText(enunciado);
      setRespostas(alternativas);
      setCorreta(respostaCorreta);
      setModeloIA(modelo);
      setResultado(null);
      respondidaRef.current = false;

      console.log("Questão gerada com sucesso:", {
        modelo,
        tipoAdaptacao: tipoFinal,
        materia,
        quantidadeAlternativas: alternativas.length,
        respostaCorreta,
      });

      return true;
    } catch (error) {
      console.error("Erro ao gerar pergunta:", error);

      setErro(
        error instanceof Error && error.message.trim()
          ? error.message
          : "Não foi possível gerar a questão."
      );

      return false;
    } finally {
      setPerguntando(false);
    }
  }

  async function verificar(escolhida: number, materia: string) {
    if (respondidaRef.current) {
      return resultado?.acertou ?? false;
    }

    if (
      !Number.isInteger(escolhida) ||
      escolhida < 0 ||
      escolhida >= respostas.length
    ) {
      setErro("Selecione uma alternativa válida antes de verificar.");
      return false;
    }

    respondidaRef.current = true;

    const acertou = escolhida === correta;

    setErro(null);
    setResultado({ acertou, escolhida, correta });

    await salvarProgresso(materia, acertou);

    return acertou;
  }

  function limparPergunta() {
    setTitle("");
    setText("");
    setRespostas([]);
    setCorreta(0);
    setModeloIA("outro");
    setResultado(null);
    setErro(null);
    respondidaRef.current = false;
  }

  return {
    title,
    text,
    respostas,
    correta,
    perguntando,
    resultado,
    erro,
    gerarPergunta,
    verificar,
    salvarTema,
    modeloIA,
    salvarProgresso,
    limparPergunta,
  };
}
