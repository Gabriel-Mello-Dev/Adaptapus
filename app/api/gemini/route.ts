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
  "caralinhos",
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

1. PRESERVE A RESPOSTA CORRETA
A resposta correta da questão original é imutável. A alternativa correta deve permanecer exatamente na mesma posição da questão original.

2. PRESERVE AS ALTERNATIVAS
Mantenha exatamente as 5 alternativas originais, na mesma ordem e com o mesmo conteúdo. NÃO reescreva, altere, simplifique, complete, remova ou reorganize nenhuma alternativa.

3. PRESERVE O EXERCÍCIO
A questão adaptada deve continuar sendo essencialmente o mesmo exercício da questão original. O estudante deve precisar aplicar o mesmo raciocínio para chegar à mesma resposta.

4. PRESERVE A ESTRUTURA DE RESOLUÇÃO
Mantenha a mesma pergunta, objetivo, operação, fórmula, relação matemática, lógica, condições e resultado da questão original.

5. PRESERVE OS DADOS NECESSÁRIOS
Todos os números, valores, unidades, fórmulas, medidas, proporções, informações e condições necessárias para resolver o exercício devem ser preservados.

6. LIBERDADE PARA RECRIAR O CONTEXTO
Você possui liberdade para reconstruir o contexto da questão. Pode trocar personagens, lugares, objetos, atividades, profissões, situações e elementos narrativos sempre que isso ajudar a integrar o tema.

7. NÃO FAÇA APENAS SUBSTITUIÇÃO DE PALAVRAS
Não transforme a questão simplesmente trocando um personagem, objeto ou palavra pelo tema. Se necessário, reescreva completamente a situação apresentada no enunciado.

8. MUDE O CONTEXTO, NÃO O EXERCÍCIO
A história pode ser diferente, mas o problema que o estudante precisa resolver deve continuar sendo o mesmo. A adaptação deve mudar principalmente o contexto narrativo, e não a lógica do exercício.

9. INTEGRE O TEMA DE VERDADE
O tema deve ter uma função real dentro da situação apresentada. O contexto deve parecer uma situação que originalmente poderia ter sido criada sobre esse tema.

10. EVITE INSERIR O TEMA ARTIFICIALMENTE
Não basta mencionar o tema no início ou substituir o nome de um personagem por algo relacionado ao tema. Os acontecimentos, objetos e ações da situação devem fazer sentido dentro do tema.

11. PRESERVE O SIGNIFICADO DOS DADOS
Os dados devem continuar representando a mesma grandeza ou informação. Litros devem representar volume, metros devem representar distância, quilogramas devem representar massa, segundos devem representar tempo etc.

12. RECONSTRUA ELEMENTOS QUANDO NECESSÁRIO
Se um elemento do contexto original não combinar naturalmente com o tema, substitua-o por outro elemento equivalente que cumpra a mesma função no exercício, sem alterar os dados ou o raciocínio necessário para resolvê-lo.

13. NÃO FORCE O TEMA
Se determinado elemento original não fizer sentido dentro do novo tema, não tente simplesmente encaixá-lo. Crie uma situação equivalente e plausível em que o mesmo exercício possa acontecer naturalmente.

14. NÃO ADICIONE INFORMAÇÕES RELEVANTES
Não invente novos dados, condições ou informações que possam mudar a interpretação ou facilitar, dificultar ou modificar a resolução do exercício.

15. NÃO REMOVA INFORMAÇÕES RELEVANTES
Nenhuma informação necessária para compreender ou resolver a questão original pode ser perdida durante a adaptação.

16. MANTENHA O NÍVEL DE DIFICULDADE
A questão adaptada deve exigir aproximadamente o mesmo nível de conhecimento e raciocínio da questão original.

17. MANTENHA A NATURALIDADE
A situação criada deve ser logicamente possível dentro do tema. Personagens, objetos, ações, medidas e acontecimentos devem ser coerentes entre si.

18. PRIORIDADE DAS REGRAS
Quando houver conflito entre criatividade e preservação da questão, preserve nesta ordem:
a) alternativa correta e sua posição;
b) conteúdo das alternativas;
c) raciocínio e solução do exercício;
d) dados e informações necessários;
e) estrutura do problema;
f) contexto narrativo original.

19. DIFERENÇA SUFICIENTE NO CONTEXTO
Não preserve o contexto original desnecessariamente. Se a situação puder ser reconstruída de maneira mais natural dentro do tema, faça isso. A adaptação deve apresentar uma mudança perceptível de contexto, sem deixar de ser o mesmo exercício.

20. RESULTADO FINAL
O resultado deve parecer uma questão originalmente escrita dentro do tema escolhido, e não uma questão original com algumas palavras substituídas.

21. VERIFICAÇÃO ANTES DA RESPOSTA
Antes de responder, verifique internamente:
a) A resposta correta continua exatamente a mesma?
b) A alternativa correta continua na mesma posição?
c) As 5 alternativas permanecem exatamente iguais?
d) O estudante resolve a questão usando o mesmo raciocínio?
e) Todos os dados necessários foram preservados?
f) O novo contexto realmente pertence ao tema?
g) A situação é natural e logicamente possível?
h) A adaptação mudou o contexto de maneira suficiente sem mudar o exercício?

22. SEGURANÇA
NÃO utilize palavrões, xingamentos ou linguagem vulgar.
NÃO gere conteúdo sexual ou pornográfico. Se o tema for sexual ou pornográfico, recuse a geração.
NÃO gere violência gráfica.
NÃO gere conteúdo discriminatório.
NÃO gere conteúdo discriminatório.
Caso o prompt possua algo deste contexto, se negue a fazer.

23. FORMATO
Retorne SOMENTE uma linha, sem explicações, observações ou comentários.

FORMATO OBRIGATÓRIO:

titulo # corpo # alt1 § alt2 § alt3 § alt4 § alt5 # correta:indice

ÍNDICE DA RESPOSTA CORRETA:
0 = primeira alternativa
1 = segunda alternativa
2 = terceira alternativa
3 = quarta alternativa
4 = quinta alternativa

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
