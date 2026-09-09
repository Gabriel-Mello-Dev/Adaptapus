"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const supabase = createClient();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(true);

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

    carregarPerfil();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
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

      <button
        onClick={logout}
        className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Sair
      </button>
    </main>
  );
}
