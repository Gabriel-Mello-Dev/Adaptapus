"use client";

import { useState } from "react";
import { createClient } from "@/app/libs/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/app/components";

export default function SignIn() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    router.push("/pages/Adaptar");
  }

  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center bg-whiteMain px-4">
      <header className="absolute top-6 left-6">
        <BackButton />
      </header>
      <div className="w-full max-w-md rounded-2xl bg-blueMain p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Entrar
        </h1>

        <p className="mb-8 text-center text-white/90">
          Entre na sua conta para continuar
        </p>

        {erro && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-sm text-blueMain/75">
        Não tem uma conta?{" "}
        <Link
          href="/pages/SignUp"
          className="font-semibold text-orangeMain hover:text-orangeSecond"
        >
          Criar conta
        </Link>
      </div>

    </main>
  );
}