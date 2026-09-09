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
      "google/gemma-4-31b-it:free",
      "google/gemma-4-26b-a4b-it:free",
      "nvidia/nemotron-3-ultra:free",
      "nvidia/nemotron-3.5-lightning:free",
      "openrouter/free",
    ];
    // Nome que será exibido no frontend
    const modelNames: Record<string, string> = {
      "google/gemma-4-31b-it:free": "gemma",
      "google/gemma-4-26b-a4b-it:free": "gemma",
      "nvidia/nemotron-3-ultra:free": "nemotron",
      "nvidia/nemotron-3.5-lightning:free": "nemotron",
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

1. NÃO altere a resposta correta da questão original.
2. A resposta correta deve permanecer na mesma posição.
3. Mantenha exatamente 4 alternativas.
4. Preserve todos os números, valores, unidades, fórmulas, dados e informações necessários para resolver a questão.
5. Mantenha exatamente o mesmo problema, raciocínio e resultado da questão original.
6. NÃO faça apenas substituição de palavras. ReESCREVA o contexto completo da questão para que a situação aconteça naturalmente dentro do tema.
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
17. Retorne SOMENTE uma linha. Não escreva explicações, observações ou comentários.

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
