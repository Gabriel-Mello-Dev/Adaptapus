/* eslint-disable @typescript-eslint/no-explicit-any */

import OpenAI from "openai";
import { analisar } from "profanity-br";

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const termosProibidos = [
  "pornografia",
  "pornografico",
  "pornografica",
  "porno",
  "sexo",
  "sexual",
  "sexuais",
  "pênis",
  "penis",
  "peniano",
  "peniana",
  "vagina",
  "vaginal",
  "genital",
  "genitais",
  "nudez",
  "nudes",
  "estupro",
  "pedofilia",
];

function encontrarTermoProibido(texto: string) {
  const normalizado = texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return termosProibidos.find((termo) => {
    const termoNormalizado = termo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return normalizado.includes(termoNormalizado);
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { questao, tema } = body;

    if (!questao || !tema) {
      return Response.json(
        {
          error: "Questão e tema são obrigatórios.",
        },
        {
          status: 400,
        },
      );
    }

    // FILTRO DO TEMA
    const analiseTema = analisar(tema);
    const termoProibido = encontrarTermoProibido(tema);

    console.log("========== FILTRO TEMA ==========");
    console.log("Tema recebido:", tema);
    console.log("Resultado profanity-br:", analiseTema);
    console.log("Termo proibido:", termoProibido);
    console.log("=================================");

    if (analiseTema.hits.length > 0 || termoProibido) {
      console.log("TEMA INVÁLIDO:", tema);

      return Response.json(
        {
          error: "O tema contém conteúdo inadequado.",
        },
        {
          status: 400,
        },
      );
    }
    // FILTRO DA QUESTÃO
    const analiseQuestao = analisar(questao);

    if (!analiseQuestao) {
      return Response.json(
        {
          error: "A questão contém palavras inadequadas.",
        },
        {
          status: 400,
        },
      );
    }

    const models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

    const modelNames: Record<string, string> = {
      "openai/gpt-oss-120b": "gpt-oss",
      "openai/gpt-oss-20b": "gpt-oss",
    };

    let completion = null;
    let lastError = null;
    let modeloUsado = "outro";

    for (const model of models) {
      try {
        completion = await client.chat.completions.create({
          model,

          messages: [
            {
              role: "user",

              content: `
Adapte a questão para o tema: ${tema}

REGRAS CRÍTICAS:

1. NÃO altere a resposta correta da questão original.
2. A resposta correta deve permanecer na mesma posição.
3. Mantenha exatamente 4 alternativas.
4. Preserve todos os números, valores, unidades, fórmulas, dados e informações necessários para resolver a questão.
5. Mantenha exatamente o mesmo problema, raciocínio e resultado da questão original.
6. NÃO faça apenas substituição de palavras. REESCREVA o contexto completo da questão para que a situação aconteça naturalmente dentro do tema.
7. Todos os elementos do novo contexto devem ser coerentes com o tema e entre si.
8. Não force o tema em elementos que não façam sentido. Se necessário, recrie completamente a situação, mantendo o mesmo problema original.
9. Preserve o significado das unidades. Litros continuam representando volume, metros continuam representando distância, quilogramas continuam representando massa, segundos continuam representando tempo etc.
10. Nunca associe uma unidade a algo que não possa ser medido por ela. Por exemplo, NÃO escreva "10 L de torcedores". Se a questão possui 10 L, crie no novo contexto algo que realmente tenha 10 litros, como água, combustível ou outro líquido adequado.
11. O tema deve fazer parte da situação de forma natural, e não apenas aparecer em uma palavra.
12. Preserve todas as informações necessárias para que o estudante consiga resolver a questão sem receber ou perder informações relevantes.
13. Não adicione informações que possam mudar a interpretação ou a resposta.
14. Mantenha aproximadamente o mesmo nível de dificuldade e a mesma estrutura de resolução.
15. O resultado deve parecer uma questão originalmente criada sobre o tema, e não uma questão genérica com palavras substituídas.
16. Antes de responder, verifique se o contexto é logicamente possível, se os valores e unidades fazem sentido e se a resposta continua correta.
17. NÃO utilize palavrões, xingamentos ou linguagem vulgar.
18. NÃO gere conteúdo sexual ou pornográfico.
19. NÃO gere violência gráfica.
20. NÃO gere conteúdo discriminatório.
21. Retorne SOMENTE uma linha. Não escreva explicações, observações ou comentários.

FORMATO OBRIGATÓRIO:

titulo # corpo # alt1 § alt2 § alt3 § alt4 # correta:indice

A resposta correta deve usar índice:
0 = primeira alternativa
1 = segunda alternativa
2 = terceira alternativa
3 = quarta alternativa

EXEMPLO:

Questão original:
"Um recipiente contém 10 L de água..."

Tema:
futebol

Adaptação:
"Durante um treinamento, o vestiário de um time recebeu um recipiente contendo 10 L de água..."

O objetivo é RECRIAR A SITUAÇÃO dentro do tema, preservando o problema original, e não simplesmente trocar palavras.

Questão:
${questao}
`,
            },
          ],
        });

        modeloUsado = modelNames[model] || "outro";

        console.log("Modelo usado:", model);
        console.log("Nome exibido:", modeloUsado);

        break;
      } catch (err) {
        console.log(`Erro no modelo ${model}:`, err);

        lastError = err;
      }
    }

    if (!completion) {
      throw lastError;
    }

    const text = completion.choices[0].message.content?.trim() || "";

    // FILTRO DA RESPOSTA GERADA PELA IA
    const analiseResposta = analisar(text);

    if (!analiseResposta) {
      return Response.json(
        {
          error: "A questão gerada contém palavras inadequadas.",
        },
        {
          status: 400,
        },
      );
    }

    return Response.json({
      text,
      modelo: modeloUsado,
    });
  } catch (err: any) {
    console.error("Erro API:", err);

    return new Response(
      JSON.stringify({
        error: err?.message || "Erro ao gerar questão",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
