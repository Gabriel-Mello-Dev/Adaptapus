"use client";

import { useState } from "react";
import { createClient } from "@/app/libs/supabase/client";
import { useRouter } from "next/navigation";
import { BackButton } from "@/app/components";
import Link from "next/link";

export default function SignUp() {
  const supabase = createClient();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setSucesso("");
    setCarregando(true);

    // Validações
    if (!nome.trim()) {
      setErro("Digite seu nome.");
      setCarregando(false);
      return;
    }

    if (!email.trim()) {
      setErro("Digite seu e-mail.");
      setCarregando(false);
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      setCarregando(false);
      return;
    }

    try {
      // 1. Cria a conta no Supabase Authentication
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
      });

      if (error) {
        console.error("Erro ao criar conta:", error);

        if (error.message.toLowerCase().includes("already registered")) {
          setErro("Este e-mail já está cadastrado.");
        } else if (
          error.message.toLowerCase().includes("invalid email")
        ) {
          setErro("Digite um e-mail válido.");
        } else if (
          error.message.toLowerCase().includes("password")
        ) {
          setErro("A senha informada não é válida.");
        } else {
          setErro("Não foi possível criar a conta. Tente novamente.");
        }

        setCarregando(false);
        return;
      }

      if (!data.user) {
        setErro("Não foi possível criar o usuário.");
        setCarregando(false);
        return;
      }

      // 2. Cria o usuário na tabela public.usuarios
      const { error: usuarioError } = await supabase
        .from("usuarios")
        .insert({
          uid: data.user.id,
          nome: nome.trim(),
        });

      if (usuarioError) {
        console.error(
          "Erro ao criar usuário na tabela:",
          usuarioError
        );

        setErro("A conta foi criada, mas houve um erro ao salvar seus dados.");
        setCarregando(false);
        return;
      }

      console.log("Conta criada com sucesso!");

      setSucesso("Conta criada com sucesso!");

      // 3. Vai para a página inicial
      router.push("/");
    } catch (error) {
      console.error("Erro inesperado:", error);
      setErro("Ocorreu um erro inesperado. Tente novamente.");
      setCarregando(false);
    }
  }

  async function mostrarUsers() {
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
    <main className="relative flex flex-col min-h-screen items-center justify-center bg-whiteMain px-4">
      <header className="absolute top-6 left-6">
        <BackButton />
      </header>
      <div className="w-full max-w-md rounded-2xl bg-blueMain p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Criar conta
        </h1>

        <p className="mb-8 text-center text-white/90">
          Cadastre-se para começar
        </p>

        {erro && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="mb-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-sm font-medium text-white/80"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-300 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white/80"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-300 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-white/80"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-300 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-greenMain px-4 py-3 font-semibold text-white transition hover:bg-greenMain/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando ? "Criando conta..." : "Cadastrar"}
          </button>


        </form>
      </div>

  
      <div className="mt-6 text-center text-sm text-blueMain/75">
        Ja tem uma conta?{" "}
        <Link
          href="/pages/SignIn"
          className="font-semibold text-orangeMain hover:text-orangeSecond"
        >
          Entrar
        </Link>
      </div>


    </main>
  );
}

