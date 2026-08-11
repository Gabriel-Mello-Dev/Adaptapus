
/* eslint-disable @typescript-eslint/no-explicit-any */

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { questao, tema } = body;

    const models = [
      "deepseek/deepseek-v4-flash:free",
      "google/gemma-4-31b-it:free",
      "google/gemma-4-26b-a4b-it:free",
      "openrouter/free",
    ];

    // Nome que será exibido no frontend
    const modelNames: Record<string, string> = {
      "deepseek/deepseek-v4-flash:free": "deepseek",
      "google/gemma-4-31b-it:free": "gemma",
      "google/gemma-4-26b-a4b-it:free": "gemma",
      "openrouter/free": "outro",
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

1. NÃO alterar a resposta correta.
2. Manter o formato de múltipla escolha.
3. Retorne SOMENTE uma linha.
4. Não escreva explicações antes ou depois.
5. Mantenha exatamente 4 alternativas.
6. A resposta correta deve continuar sendo a mesma alternativa da questão original.

FORMATO OBRIGATÓRIO:

titulo # corpo # alt1 § alt2 § alt3 § alt4 # correta:indice

EXEMPLO:

Uma questão sobre futebol # Qual jogador marcou o gol? # Neymar § Pelé § Ronaldo § Romário # correta:1

Questão:
${questao}
`,
            },
          ],
        });

        // Guarda o nome genérico do modelo que realmente respondeu
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
