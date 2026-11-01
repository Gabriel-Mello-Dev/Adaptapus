"use client";

import { useState } from "react";

import { createClient } from "@/app/libs/supabase/client";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { BackButton } from "@/app/components";

import Image from "next/image";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

export default function SignIn() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    const { data: usuario, error: usuarioError } =
      await supabase
        .from("usuarios")
        .select("active")
        .eq("uid", data.user.id)
        .maybeSingle();

    if (usuarioError) {
      console.error(usuarioError);

      await supabase.auth.signOut();

      setErro("Erro ao verificar a conta.");
      setCarregando(false);

      return;
    }

    if (!usuario) {
      await supabase.auth.signOut();

      setErro("Usuário não encontrado.");
      setCarregando(false);

      return;
    }

    if (usuario.active === false) {
      await supabase.auth.signOut();

      setErro("Esta conta está desativada.");
      setCarregando(false);

      return;
    }

    router.push("/");
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-whiteMain px-4 py-4 sm:justify-center sm:px-6 sm:py-8">
      {/* DETALHES DECORATIVOS - SUPERIOR ESQUERDO */}
      <div className="pointer-events-none absolute -left-10 -top-2 h-40 w-40 opacity-30">
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M-10 40C30 15 50 35 72 10C94-15 112 2 130-18"
            stroke="currentColor"
            strokeWidth="12"
            className="text-orangeSecond"
          />

          <path
            d="M-20 82C22 58 44 78 65 53C85 28 110 45 137 20"
            stroke="currentColor"
            strokeWidth="7"
            className="text-orangeSecond"
          />

          <circle
            cx="92"
            cy="108"
            r="7"
            fill="currentColor"
            className="text-orangeSecond"
          />

          <circle
            cx="112"
            cy="94"
            r="4"
            fill="currentColor"
            className="text-orangeSecond"
          />
        </svg>
      </div>

      {/* DETALHES DECORATIVOS - INFERIOR DIREITO */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rotate-180 opacity-30">
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M-10 40C30 15 50 35 72 10C94-15 112 2 130-18"
            stroke="currentColor"
            strokeWidth="12"
            className="text-orangeSecond"
          />

          <path
            d="M-20 82C22 58 44 78 65 53C85 28 110 45 137 20"
            stroke="currentColor"
            strokeWidth="7"
            className="text-orangeSecond"
          />

          <circle
            cx="92"
            cy="108"
            r="7"
            fill="currentColor"
            className="text-orangeSecond"
          />

          <circle
            cx="112"
            cy="94"
            r="4"
            fill="currentColor"
            className="text-orangeSecond"
          />
        </svg>
      </div>

      {/* BOTÃO VOLTAR */}
      <header className="z-20 mb-4 w-full max-w-md sm:absolute sm:left-6 sm:top-6 sm:mb-0 sm:w-auto sm:max-w-none">
        <BackButton />
      </header>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-blueMain p-6 shadow-2xl sm:p-8">
        {/* DETALHE SUPERIOR DO CARD */}
        <div className="pointer-events-none absolute right-0 top-0 opacity-20">
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            fill="none"
          >
            <circle
              cx="95"
              cy="15"
              r="32"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blueSecond"
            />

            <circle
              cx="95"
              cy="15"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blueSecond"
            />

            <circle
              cx="95"
              cy="15"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blueSecond"
            />
          </svg>
        </div>

        {/* CABEÇALHO */}
        <section className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-whiteMain">
            Entrar
          </h1>

          <p className="mt-2 text-base text-blueThird">
            Entre na sua conta para continuar
          </p>

          <Image
            src="/imgs/logoAdaptapus.png"
            alt="Logo Adaptapus"
            width={72}
            height={72}
            className="mt-6 h-18 w-18 transition-transform duration-300 hover:scale-105"
          />
        </section>

        {/* ERRO */}
        {erro && (
          <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <p>{erro}</p>

            {erro === "Esta conta está desativada." && (
              <p className="mt-2 text-red-200/80">
                Não entendeu o motivo do banimento?{" "}
                <a
                  href="/contato"
                  className="font-semibold text-orangeSecond underline transition hover:text-orangeMain"
                >
                  Entre em contato.
                </a>
              </p>
            )}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* E-MAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-whiteMain"
            >
              <span className="h-0.5 w-5 rounded-full bg-orangeMain" />
              E-mail
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blueThird"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-blueSecond
                  bg-blueMain
                  py-3.5
                  pl-12
                  pr-4
                  text-whiteMain
                  placeholder:text-blueSecond
                  outline-none
                  transition
                  focus:border-orangeSecond
                  focus:ring-2
                  focus:ring-orangeMain/20
                "
              />
            </div>
          </div>

          {/* SENHA */}
          <div>
            <label
              htmlFor="senha"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-whiteMain"
            >
              <span className="h-0.5 w-5 rounded-full bg-orangeMain" />
              Senha
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blueThird"
              />

              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="
                  w-full
                  rounded-xl
                  border
                  border-blueSecond
                  bg-blueMain
                  py-3.5
                  pl-12
                  pr-12
                  text-whiteMain
                  placeholder:text-blueSecond
                  outline-none
                  transition
                  focus:border-orangeSecond
                  focus:ring-2
                  focus:ring-orangeMain/20
                "
              />

              <button
                type="button"
                onClick={() =>
                  setMostrarSenha((prev) => !prev)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-blueThird
                  transition
                  hover:text-whiteMain
                "
                aria-label={
                  mostrarSenha
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
              >
                {mostrarSenha ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* ENTRAR */}
          <button
            type="submit"
            disabled={carregando}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-greenMain
              px-4
              py-3.5
              font-semibold
              text-whiteMain
              transition
              hover:bg-greenMain/85
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {carregando ? "Entrando..." : "Entrar"}

            {!carregando && <ArrowRight size={20} />}
          </button>
        </form>

        {/* CADASTRO */}
        <div className="mt-7 flex items-center gap-3 text-sm text-blueThird">
          <span className="h-px flex-1 bg-blueSecond/60" />

          <span className="shrink-0">
            Não tem uma conta?{" "}
            <Link
              href="/pages/SignUp"
              className="font-semibold text-orangeSecond transition hover:text-orangeMain"
            >
              Criar conta
            </Link>
          </span>

          <span className="h-px flex-1 bg-blueSecond/60" />
        </div>

        {/* DETALHE INFERIOR */}
        <div className="pointer-events-none absolute bottom-0 left-0 opacity-20">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M0 88C18 72 28 90 42 76C55 63 65 74 78 59C88 48 95 52 100 46"
              stroke="currentColor"
              strokeWidth="3"
              className="text-blueSecond"
            />

            <circle
              cx="22"
              cy="72"
              r="5"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blueSecond"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}