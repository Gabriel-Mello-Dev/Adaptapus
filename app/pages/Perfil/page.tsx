/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";
import { useRouter } from "next/navigation";

type ProgressoMateria = {
  erros: number;
  total: number;
  acertos: number;
};

export default function Perfil() {
  const supabase = createClient();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [temas, setTemas] = useState<string[]>([]);
  const [progresso, setProgresso] = useState<{
    matematica: ProgressoMateria;
    fisica: ProgressoMateria;
    quimica: ProgressoMateria;
  }>({
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
  });
  // ___________________________________________CARREGAR TEMA
  const CarregarTemas = async () => {
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

    setTemas(temasUsuario);
  };
  // ___________________________________________CARREGAR PROGRESSO
  const carregarProgresso = async () => {
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
  };
  // ___________________________________________CARREGAR PERFIL
  useEffect(() => {
    async function carregarPerfil() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      setEmail(user.email || "");

      const { data } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("uid", user.id)
        .single();

      if (data) {
        setNome(data.nome);
      }

      setCarregando(false);
    }

    CarregarTemas();

    carregarPerfil();

    carregarProgresso();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/pages/SignIn");
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Meu Perfil</h1>
      <div className="mt-6">
        <p>
          <strong>Nome:</strong> {nome}
        </p>

        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
      <h1>{temas}</h1>
      ------------------------------------- Temas
      <p>Matemática</p>
      <p>Acertos: {progresso.matematica.acertos}</p>
      <p>Erros: {progresso.matematica.erros}</p>

  <p>Fisica</p>
      <p>Acertos: {progresso.fisica.acertos}</p>
      <p>Erros: {progresso.fisica.erros}</p>

 <p>Quimica</p>
      <p>Acertos: {progresso.quimica.acertos}</p>
      <p>Erros: {progresso.quimica.erros}</p>

      <button
        onClick={logout}
        className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Sair
      </button>
    </main>
  );
}
