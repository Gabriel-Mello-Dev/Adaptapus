"use client";

import { useState } from "react";
import { createClient } from "@/app/libs/supabase/client";

export default function CadastroPage() {
  const supabase = createClient();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("funcionou");

    // 1. Cria a conta no Supabase Authentication
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      console.error("Erro ao criar conta:", error);
      return;
    }

    if (!data.user) {
      console.error("Usuário não foi criado.");
      return;
    }

    // 2. Cria o usuário na tabela public.usuarios
    const { error: usuarioError } = await supabase
      .from("usuarios")
      .insert({
        uid: data.user.id,
        nome: nome,
      });

    if (usuarioError) {
      console.error("Erro ao criar usuário na tabela:", usuarioError);
      return;
    }

    console.log("Conta criada com sucesso!");
  }

  async function mostrarUsers(){
            const { data, error } = await supabase
        .from("usuarios")
        .select("*");

        if (error) {
        console.error("Erro ao buscar usuários:", error);
        return;
        }

        console.log("Usuários:", data);
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Criar conta
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Cadastre-se para começar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nome
            </label>

            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* E-mail */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Senha
            </label>

            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Cadastrar
          </button>
          <button onClick={mostrarUsers}>Clique</button>
        </form>
      </div>
    </main>
  );
}