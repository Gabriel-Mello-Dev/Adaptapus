/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({ apiKey });

const MODELS = [
  "models/gemini-3-flash-preview",
  "models/gemini-2.0-flash",
  "models/gemini-1.5-flash",
];

async function gerarComFallback(contents: any) {
  for (const model of MODELS) {
    try {
      console.log("Tentando modelo:", model);

      const response = await ai.models.generateContent({
        model,
        contents,
      });

      return response;
    } catch (err: any) {
      if (err?.status === 503) {
        console.log("Modelo ocupado, tentando próximo...");
        continue;
      }

      throw err;
    }
  }

  throw new Error("Todos os modelos falharam");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questao, tema } = body;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Adapte a questão para o tema: ${tema}.
REGRAS CRÍTICAS:
- NÃO alterar pergunta.
- NÃO alterar alternativas.
- NÃO alterar resposta correta.

FORMATO:
titulo # corpo # alt1 § alt2 § alt3 § alt4 # correta:indice

Questão:
${questao}`,
          },
        ],
      },
    ];

    const response = await gerarComFallback(contents);

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sem resposta";

    return Response.json({ text });
  } catch (err: any) {
    console.error("Erro API:", err);

    return new Response(
      JSON.stringify({
        error: "Erro ao gerar questão",
        detalhe: err?.message,
      }),
      { status: 500 }
    );
  }
}