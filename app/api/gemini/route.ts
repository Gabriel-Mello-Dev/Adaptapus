export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { questao, tema } = body;

    if (!questao || !tema) {
      return Response.json(
        {
          sucesso: false,
          error: "Questão e tema são obrigatórios.",
        },
        {
          status: 400,
        },
      );
    }

    // ==========================================
    // FILTRO DO TEMA
    // ==========================================

    const analiseTema = analisar(tema);
    const termoProibido = encontrarTermoProibido(tema);

    console.log("========== FILTRO TEMA ==========");
    console.log("Tema recebido:", tema);
    console.log("Resultado profanity-br:", analiseTema);
    console.log("Termo proibido:", termoProibido);
    console.log("=================================");

    if (analiseTema.hits.length > 0 || termoProibido) {
      console.log("TEMA INVÁLIDO. ADAPTAÇÃO CANCELADA.");

      return Response.json(
        {
          sucesso: false,
          feita: false,
          error: "A adaptação não foi realizada porque o tema é inadequado.",
        },
        {
          status: 400,
        },
      );
    }

    // ==========================================
    // FILTRO DA QUESTÃO
    // ==========================================

    const analiseQuestao = analisar(questao);

    if (analiseQuestao.hits.length > 0) {
      console.log("QUESTÃO INVÁLIDA. ADAPTAÇÃO CANCELADA.");

      return Response.json(
        {
          sucesso: false,
          feita: false,
          error: "A adaptação não foi realizada porque a questão contém conteúdo inadequado.",
        },
        {
          status: 400,
        },
      );
    }

    // ==========================================
    // DAQUI PARA BAIXO SÓ EXECUTA SE TUDO ESTIVER OK
    // ==========================================

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
9. Preserve o significado das unidades.
10. Nunca associe uma unidade a algo que não possa ser medido por ela.
11. O tema deve fazer parte da situação de forma natural.
12. Preserve todas as informações necessárias.
13. Não adicione informações que possam mudar a interpretação ou a resposta.
14. Mantenha aproximadamente o mesmo nível de dificuldade.
15. O resultado deve parecer uma questão originalmente criada sobre o tema.
16. Verifique se o contexto é logicamente possível e se a resposta continua correta.
17. NÃO utilize palavrões, xingamentos ou linguagem vulgar.
18. NÃO gere conteúdo sexual ou pornográfico.
19. NÃO gere violência gráfica.
20. NÃO gere conteúdo discriminatório.
21. Retorne SOMENTE uma linha.

FORMATO:

titulo # corpo # alt1 § alt2 § alt3 § alt4 # correta:indice

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

    // ==========================================
    // FILTRO DA RESPOSTA DA IA
    // ==========================================

    const analiseResposta = analisar(text);
    const termoProibidoResposta = encontrarTermoProibido(text);

    if (
      analiseResposta.hits.length > 0 ||
      termoProibidoResposta
    ) {
      console.log("RESPOSTA DA IA INVÁLIDA. ADAPTAÇÃO CANCELADA.");

      return Response.json(
        {
          sucesso: false,
          feita: false,
          error: "A adaptação não foi realizada porque a resposta gerada contém conteúdo inadequado.",
        },
        {
          status: 400,
        },
      );
    }

    // ==========================================
    // SUCESSO
    // ==========================================

    return Response.json({
      sucesso: true,
      feita: true,
      text,
      modelo: modeloUsado,
    });

  } catch (err: any) {
    console.error("Erro API:", err);

    return new Response(
      JSON.stringify({
        sucesso: false,
        feita: false,
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