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
    <main className="min-h-screen bg-whiteMain text-blueMain p-6">

      <BackButton />

      <div className="mx-auto w-full max-w-5xl">

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
    </main>
  );
}
