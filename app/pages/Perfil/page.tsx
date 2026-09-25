/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";
import { useRouter } from "next/navigation";
import { BackButton } from "@/app/components";

type ProgressoMateria = {
  erros: number;
  total: number;
  acertos: number;
};

type Progresso = {
  matematica: ProgressoMateria;
  fisica: ProgressoMateria;
  quimica: ProgressoMateria;
};

const progressoInicial: Progresso = {
  matematica: {
    erros: 0,
    total: 0,
    acertos: 0,
  },
  fisica: {
    erros: 0,
    total: 0,
    acertos: 0,
  },
  quimica: {
    erros: 0,
    total: 0,
    acertos: 0,
  },
};

export default function Perfil() {
  const supabase = createClient();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [temas, setTemas] = useState<string[]>([]);
  const [progresso, setProgresso] = useState<Progresso>(progressoInicial);

  function normalizarTexto(texto: string) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function distanciaLevenshtein(a: string, b: string) {
    const matriz = Array.from({ length: b.length + 1 }, () =>
      Array(a.length + 1).fill(0),
    );

    for (let i = 0; i <= b.length; i++) {
      matriz[i][0] = i;
    }

    for (let j = 0; j <= a.length; j++) {
      matriz[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matriz[i][j] = matriz[i - 1][j - 1];
        } else {
          matriz[i][j] = Math.min(
            matriz[i - 1][j] + 1,
            matriz[i][j - 1] + 1,
            matriz[i - 1][j - 1] + 1,
          );
        }
      }
    }

    return matriz[b.length][a.length];
  }

  function saoTemasParecidos(a: string, b: string) {
    const temaA = normalizarTexto(a);
    const temaB = normalizarTexto(b);

    if (temaA === temaB) {
      return true;
    }

    const distancia = distanciaLevenshtein(temaA, temaB);

    const maiorTamanho = Math.max(temaA.length, temaB.length);

    // Temas muito curtos precisam ser mais rigorosos
    if (maiorTamanho <= 4) {
      return distancia <= 1;
    }

    if (maiorTamanho <= 8) {
      return distancia <= 2;
    }

    return distancia <= 3;
  }

  function removerTemasDuplicados(lista: string[]) {
    const temasUnicos: string[] = [];

    for (const tema of lista) {
      if (!tema.trim()) {
        continue;
      }

      const jaExiste = temasUnicos.some((temaExistente) =>
        saoTemasParecidos(tema, temaExistente),
      );

      if (!jaExiste) {
        temasUnicos.push(tema);
      }
    }

    return temasUnicos;
  }

  async function carregarTemas() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("temas_usuarios")
      .select("tema")
      .eq("uid", user.id);

    if (error) {
      console.error("Erro ao buscar temas:", error);
      return;
    }

    const temasUsuario = data?.map((item) => item.tema) ?? [];

    setTemas(removerTemasDuplicados(temasUsuario));
  }

  async function carregarProgresso() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("progresso_usuario")
      .select("matematica, fisica, quimica")
      .eq("uid", user.id);

    if (error) {
      console.error("Erro ao buscar progresso:", error);
      return;
    }

    if (data && data.length > 0) {
      setProgresso(data[0]);
    }
  }

 useEffect(() => {
  async function carregarPerfil() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/pages/SignIn");
      return;
    }

    const { data: usuario, error: usuarioError } = await supabase
      .from("usuarios")
      .select("nome, active")
      .eq("uid", user.id)
      .single();

    if (usuarioError || !usuario) {
      await supabase.auth.signOut();
      router.push("/pages/SignIn");
      return;
    }

    if (usuario.active === false) {
      await supabase.auth.signOut();
      router.push("/pages/SignIn");
      return;
    }

    setEmail(user.email || "");
    setNome(usuario.nome);

    setCarregando(false);
  }

  carregarPerfil();
  carregarTemas();
  carregarProgresso();
}, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/pages/SignIn");
  }

  function calcularPorcentagem(materia: ProgressoMateria) {
    if (materia.total === 0) {
      return 0;
    }

    return Math.round((materia.acertos / materia.total) * 100);
  }

async function desativarConta() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("usuarios")
    .update({ active: false })
    .eq("uid", user.id);

  if (error) {
    console.error("Erro ao desativar conta:", error);
    return;
  }

  await supabase.auth.signOut();
  router.push("/pages/SignIn");
}
  

  if (carregando) {
    return (
      <main className="min-h-screen p-8">
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-whiteMain text-blueMain p-6 relative">

      {/* DECORAÇÕES SVG */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* ========================= */}
        {/* BOLHAS - ESQUERDA */}
        {/* ========================= */}

        <svg
          className="absolute left-[2%] top-[18%] h-36 w-36 text-orangeSecond/30 sm:left-[5%]"
          viewBox="0 0 150 150"
          fill="none"
        >
          <circle
            cx="28"
            cy="35"
            r="6"
            fill="currentColor"
          />

          <circle
            cx="82"
            cy="48"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="45"
            cy="102"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="112"
            cy="88"
            r="4"
            fill="currentColor"
          />

          <circle
            cx="98"
            cy="20"
            r="3"
            fill="currentColor"
          />
        </svg>


        {/* ========================= */}
        {/* BOLHAS - DIREITA */}
        {/* ========================= */}

        <svg
          className="absolute right-[2%] top-[22%] h-40 w-40 text-greenMain/30 sm:right-[5%]"
          viewBox="0 0 160 160"
          fill="none"
        >
          <circle
            cx="35"
            cy="30"
            r="5"
            fill="currentColor"
          />

          <circle
            cx="82"
            cy="52"
            r="11"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="128"
            cy="83"
            r="6"
            fill="currentColor"
          />

          <circle
            cx="62"
            cy="116"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="126"
            cy="132"
            r="3"
            fill="currentColor"
          />
        </svg>


        {/* ========================= */}
        {/* BOLHAS CENTRAIS ESQUERDA */}
        {/* ========================= */}

        <svg
          className="absolute left-[1%] top-[45%] h-28 w-28 text-orangeMain/25 sm:left-[7%]"
          viewBox="0 0 120 120"
          fill="none"
        >
          <circle
            cx="24"
            cy="30"
            r="4"
            fill="currentColor"
          />

          <circle
            cx="60"
            cy="52"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="92"
            cy="28"
            r="5"
            fill="currentColor"
          />

          <circle
            cx="76"
            cy="91"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>


        {/* ========================= */}
        {/* BOLHAS CENTRAIS DIREITA */}
        {/* ========================= */}

        <svg
          className="absolute right-[1%] top-[50%] h-32 w-32 text-orangeSecond/25 sm:right-[7%]"
          viewBox="0 0 130 130"
          fill="none"
        >
          <circle
            cx="28"
            cy="35"
            r="5"
            fill="currentColor"
          />

          <circle
            cx="64"
            cy="58"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="105"
            cy="32"
            r="4"
            fill="currentColor"
          />

          <circle
            cx="94"
            cy="96"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>


        {/* ========================= */}
        {/* CORAIS / ALGAS - ESQUERDA */}
        {/* ========================= */}

        <svg
          className="absolute -bottom-10 -left-6 h-72 w-72 text-orangeSecond/75 sm:-bottom-8 sm:-left-2 sm:h-80 sm:w-80"
          viewBox="0 0 320 320"
          fill="none"
        >

          {/* Coral laranja */}
          <path
            d="
              M18 320
              C20 285 28 260 42 238
              C57 215 54 194 35 173

              M42 238
              C64 228 82 208 88 183

              M44 224
              C26 216 16 201 13 182

              M56 204
              C78 191 92 168 98 143

              M37 250
              C20 245 8 233 3 217
            "
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Segundo coral */}
          <path
            d="
              M72 320
              C72 288 81 263 96 239
              C111 216 119 190 120 163

              M96 239
              C119 230 138 210 147 185

              M104 215
              C86 203 79 185 79 165
            "
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Alga azul */}
          <path
            d="
              M124 320
              C111 286 116 252 134 225
              C152 198 149 169 138 143
              C129 120 134 95 151 74
              C159 64 163 49 159 35
            "
            stroke="#27314b"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <path
            d="
              M154 320
              C143 287 148 257 164 233
              C181 207 183 181 176 155
              C170 132 175 108 191 88
              C198 79 202 66 198 53
            "
            stroke="#27314b"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Vegetação verde */}
          <path
            d="
              M0 302
              C33 285 61 286 92 301
              C120 314 147 313 176 298
              C204 283 230 286 257 301
              C281 315 299 315 320 305
              L320 320
              L0 320
              Z
            "
            fill="#3c9d81"
            opacity="0.35"
          />
        </svg>


        {/* ========================= */}
        {/* CORAIS / ALGAS - DIREITA */}
        {/* ========================= */}

        <svg
          className="absolute -bottom-10 -right-6 h-72 w-72 scale-x-[-1] text-orangeSecond/75 sm:-bottom-8 sm:-right-2 sm:h-80 sm:w-80"
          viewBox="0 0 320 320"
          fill="none"
        >

          {/* Coral laranja */}
          <path
            d="
              M18 320
              C20 285 28 260 42 238
              C57 215 54 194 35 173

              M42 238
              C64 228 82 208 88 183

              M44 224
              C26 216 16 201 13 182

              M56 204
              C78 191 92 168 98 143

              M37 250
              C20 245 8 233 3 217
            "
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Segundo coral */}
          <path
            d="
              M72 320
              C72 288 81 263 96 239
              C111 216 119 190 120 163

              M96 239
              C119 230 138 210 147 185

              M104 215
              C86 203 79 185 79 165
            "
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Alga azul */}
          <path
            d="
              M124 320
              C111 286 116 252 134 225
              C152 198 149 169 138 143
              C129 120 134 95 151 74
              C159 64 163 49 159 35
            "
            stroke="#27314b"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <path
            d="
              M154 320
              C143 287 148 257 164 233
              C181 207 183 181 176 155
              C170 132 175 108 191 88
              C198 79 202 66 198 53
            "
            stroke="#27314b"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Vegetação verde */}
          <path
            d="
              M0 302
              C33 285 61 286 92 301
              C120 314 147 313 176 298
              C204 283 230 286 257 301
              C281 315 299 315 320 305
              L320 320
              L0 320
              Z
            "
            fill="#3c9d81"
            opacity="0.35"
          />
        </svg>


        {/* ========================= */}
        {/* BOLHAS PRÓXIMAS À BASE */}
        {/* ========================= */}

        <svg
          className="absolute bottom-[13%] left-[14%] h-24 w-24 text-orangeSecond/30 sm:left-[18%]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="25"
            cy="70"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="56"
            cy="45"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="78"
            cy="22"
            r="4"
            fill="currentColor"
          />
        </svg>


        <svg
          className="absolute bottom-[15%] right-[14%] h-24 w-24 text-greenMain/30 sm:right-[18%]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="24"
            cy="69"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="56"
            cy="44"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
          />

          <circle
            cx="77"
            cy="20"
            r="4"
            fill="currentColor"
          />
        </svg>

      </div>

      <div className="relative z-10 w-full">
        <BackButton />

        <div className="mx-auto w-full max-w-5xl mt-3">

          {/* TÍTULO */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-orangeMain">
              Meu Perfil
            </h1>

            <p className="mt-1 text-sm text-orangeSecond">
              Informações da conta e progresso.
            </p>
          </header>

          {/* INFORMAÇÕES */}
          <section className="mb-8 rounded-2xl border border-orangeMain bg-blueMain p-6 text-whiteMain">
            <h2 className="mb-5 text-xl font-semibold">
              Informações da conta
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-whiteMain/60">
                  Nome
                </p>

                <p className="mt-1 text-whiteMain">
                  {nome}
                </p>
              </div>

              <div>
                <p className="text-sm text-whiteMain/60">
                  Email
                </p>

                <p className="mt-1 break-all text-whiteMain">
                  {email}
                </p>
              </div>
            </div>
          </section>

          {/* PROGRESSO */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-orangeMain">
                Progresso
              </h2>

              <p className="text-sm text-orangeSecond">
                Seu desempenho em cada matéria.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {/* MATEMÁTICA */}
              <div className="rounded-2xl border border-orangeMain bg-blueMain p-5 text-whiteMain">
                <h3 className="mb-4 font-semibold">
                  Matemática
                </h3>

                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-whiteMain/70">
                      Aproveitamento
                    </span>

                    <span className="text-whiteMain">
                      {calcularPorcentagem(progresso.matematica)}%
                    </span>
                  </div>

                  <div className="h-2 rounded bg-blueSecond/30">
                    <div
                      className="h-2 rounded bg-greenMain"
                      style={{
                        width: `${calcularPorcentagem(progresso.matematica)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-3">
                    <p className="text-sm text-whiteMain/60">
                      Acertos
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-greenMain">
                      {progresso.matematica.acertos}
                    </p>
                  </div>

                  <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-3">
                    <p className="text-sm text-whiteMain/60">
                      Erros
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-red-400">
                      {progresso.matematica.erros}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-whiteMain/60">
                  {progresso.matematica.total} questões
                </p>
              </div>

              {/* FÍSICA */}
              <div className="rounded-2xl border border-orangeMain bg-blueMain p-5 text-whiteMain">
                <h3 className="mb-4 font-semibold">
                  Física
                </h3>

                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-whiteMain/70">
                      Aproveitamento
                    </span>

                    <span className="text-whiteMain">
                      {calcularPorcentagem(progresso.fisica)}%
                    </span>
                  </div>

                  <div className="h-2 rounded bg-blueSecond/30">
                    <div
                      className="h-2 rounded bg-greenMain"
                      style={{
                        width: `${calcularPorcentagem(progresso.fisica)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-3">
                    <p className="text-sm text-whiteMain/60">
                      Acertos
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-greenMain">
                      {progresso.fisica.acertos}
                    </p>
                  </div>

                  <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-3">
                    <p className="text-sm text-whiteMain/60">
                      Erros
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-red-400">
                      {progresso.fisica.erros}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-whiteMain/60">
                  {progresso.fisica.total} questões
                </p>
              </div>

              {/* QUÍMICA */}
              <div className="rounded-2xl border border-orangeMain bg-blueMain p-5 text-whiteMain">
                <h3 className="mb-4 font-semibold">
                  Química
                </h3>

                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-whiteMain/70">
                      Aproveitamento
                    </span>

                    <span className="text-whiteMain">
                      {calcularPorcentagem(progresso.quimica)}%
                    </span>
                  </div>

                  <div className="h-2 rounded bg-blueSecond/30">
                    <div
                      className="h-2 rounded bg-greenMain"
                      style={{
                        width: `${calcularPorcentagem(progresso.quimica)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-3">
                    <p className="text-sm text-whiteMain/60">
                      Acertos
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-greenMain">
                      {progresso.quimica.acertos}
                    </p>
                  </div>

                  <div className="rounded-xl border border-blueSecond bg-blueSecond/20 p-3">
                    <p className="text-sm text-whiteMain/60">
                      Erros
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-red-400">
                      {progresso.quimica.erros}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-whiteMain/60">
                  {progresso.quimica.total} questões
                </p>
              </div>

            </div>
          </section>

          {/* TEMAS */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-orangeMain">
                Temas utilizados
              </h2>

              <p className="text-sm text-orangeSecond">
                Temas utilizados nas questões adaptadas.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-orangeMain bg-blueMain text-whiteMain">
              {temas.length > 0 ? (
                <div className="max-h-72 overflow-y-auto">
                  <table className="w-full text-left">
                    <thead className="sticky top-0 bg-blueSecond text-whiteMain">
                      <tr>
                        <th className="w-16 px-4 py-3 text-sm font-medium">
                          #
                        </th>

                        <th className="px-4 py-3 text-sm font-medium">
                          Tema
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {temas.map((tema, index) => (
                        <tr
                          key={`${normalizarTexto(tema)}-${index}`}
                          className="border-t border-blueSecond/50"
                        >
                          <td className="px-4 py-3 text-sm text-whiteMain/60">
                            {index + 1}
                          </td>

                          <td className="px-4 py-3 text-whiteMain">
                            {tema}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="p-6 text-center text-sm text-whiteMain/50">
                  Nenhum tema utilizado ainda.
                </p>
              )}
            </div>

            {temas.length > 0 && (
              <p className="mt-2 text-right text-sm text-blueSecond">
                {temas.length}{" "}
                {temas.length === 1 ? "tema" : "temas"}
              </p>
            )}
          </section>

          {/* SAIR */}
          <button
            onClick={logout}
            className="
              rounded-xl
              bg-red-500
              px-5
              py-2
              text-whiteMain
              transition
              hover:bg-red-400
            
            "
          >
            Sair
          </button>

          <button
            type="button"
            onClick={desativarConta}
            className="
              ml-3
              rounded-xl
              bg-red-500
              px-5
              py-2
              text-whiteMain
              transition
              hover:bg-red-400
            
            "
          >
            Desativar conta
          </button>
        </div>
      </div>
    </main>
  );
}
