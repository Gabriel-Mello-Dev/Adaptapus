"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";

const planos = [
  {
    id: 1,
    nome: "Polvo Pigmeu",
    descricao: "Para começar a explorar.",
    limite: "10 questões por dia",
    preco: "Grátis",
  },
  {
    id: 2,
    nome: "Polvo Comum",
    descricao: "Para quem quer aprender mais.",
    limite: "50 questões por dia",
    preco: "Plano intermediário",
  },
  {
    id: 3,
    nome: "Kraken",
    descricao: "Para quem não quer limites.",
    limite: "Questões ilimitadas",
    preco: "Plano premium",
  },
];

export default function PlanosPage() {
  const [planoAtual, setPlanoAtual] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function carregarPlano() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMensagem("Faça login para visualizar seus planos.");
        setCarregando(false);
        return;
      }

      const { data, error } = await supabase
        .from("usuarios")
        .select("plano")
        .eq("uid", user.id)
        .single();

      if (error || !data) {
        setMensagem("Não foi possível carregar seu plano.");
      } else {
        setPlanoAtual(data.plano);
      }

      setCarregando(false);
    }

    carregarPlano();
  }, []);

  async function alterarPlano(novoPlano: number) {
    if (planoAtual === novoPlano) return;

    setAtualizando(novoPlano);
    setMensagem("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMensagem("Faça login para alterar seu plano.");
      setAtualizando(null);
      return;
    }

    const { error } = await supabase
      .from("usuarios")
      .update({ plano: novoPlano })
      .eq("uid", user.id);

    if (error) {
      console.error("Erro ao alterar plano:", error);
      setMensagem("Não foi possível alterar seu plano.");
      setAtualizando(null);
      return;
    }

    const { error: syncError } = await supabase.rpc(
      "sincronizar_limite_diario"
    );

    if (syncError) {
      console.error("Erro ao sincronizar limite:", syncError);
      setMensagem("Plano alterado, mas houve um erro ao atualizar seu limite.");
      setAtualizando(null);
      return;
    }

    setPlanoAtual(novoPlano);
    setMensagem("Plano alterado com sucesso!");
    setAtualizando(null);
  }

  if (carregando) {
    return <main>Carregando planos...</main>;
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-3xl font-bold">
          Escolha seu polvo
        </h1>

        <p className="mb-10 text-gray-500">
          Escolha o plano ideal para sua jornada de aprendizagem.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {planos.map((plano) => {
            const selecionado = planoAtual === plano.id;
            const processando = atualizando === plano.id;

            return (
              <div
                key={plano.id}
                className={`flex flex-col rounded-2xl border p-6 ${
                  selecionado
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-gray-200"
                }`}
              >
                <h2 className="text-xl font-bold">
                  {plano.nome}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {plano.descricao}
                </p>

                <p className="my-8 text-lg font-semibold">
                  {plano.preco}
                </p>

                <p className="mb-8 text-sm">
                  {plano.limite}
                </p>

                <button
                  onClick={() => alterarPlano(plano.id)}
                  disabled={selecionado || atualizando !== null}
                  className={`mt-auto rounded-xl px-4 py-3 font-semibold transition ${
                    selecionado
                      ? "cursor-default bg-gray-200 text-gray-600"
                      : "bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
                  }`}
                >
                  {processando
                    ? "Atualizando..."
                    : selecionado
                      ? "Plano atual"
                      : "Escolher plano"}
                </button>
              </div>
            );
          })}
        </div>

        {mensagem && (
          <p className="mt-6 text-center text-sm">
            {mensagem}
          </p>
        )}
      </div>
    </main>
  );
}