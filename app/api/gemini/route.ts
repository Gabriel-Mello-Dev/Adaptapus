
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

    let completion = null;
    let lastError = null;

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
- NÃO alterar resposta correta
- Manter múltipla escolha
- Retorne SOMENTE no formato abaixo

FORMATO:
titulo # corpo # alt1 § alt2 § alt3 § alt4 # correta:indice

Questão:
${questao}
              `,
            },
          ],
        });

        console.log("Modelo usado:", model);

        break;
      } catch (err) {
        console.log(`Erro no modelo ${model}:`, err);

        lastError = err;
      }
    }

    if (!completion) {
      throw lastError;
    }

    const text = completion.choices[0].message.content;

    return Response.json({
      text,
    });
  } catch (err: any) {
    console.error("Erro API:", err);

    return new Response(
      JSON.stringify({
        error: err?.message || "Erro ao gerar questão",
      }),
      {
        status: 500,
      },
    );
  }
}

