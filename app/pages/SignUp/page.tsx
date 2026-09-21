"use client";

import { useState } from "react";

import { createClient } from "@/app/libs/supabase/client";

import { useRouter } from "next/navigation";

import { BackButton } from "@/app/components";

import Link from "next/link";

import Image from "next/image";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function SignUp() {
  const supabase = createClient();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
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

        if (
          error.message
            .toLowerCase()
            .includes("already registered")
        ) {
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
          setErro(
            "Não foi possível criar a conta. Tente novamente.",
          );
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
          usuarioError,
        );

        setErro(
          "A conta foi criada, mas houve um erro ao salvar seus dados.",
        );

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

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-whiteMain px-4 py-8 sm:px-6">
      {/* DETALHES DECORATIVOS */}
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 opacity-30">
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
        </svg>
      </div>

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
        </svg>
      </div>

      {/* BOTÃO VOLTAR */}
      <header className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <BackButton />
      </header>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-blueMain p-6 shadow-2xl sm:p-8">

        {/* DETALHE SUPERIOR */}
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
            Criar conta
          </h1>

          <p className="mt-2 text-base text-blueThird">
            Cadastre-se para começar
          </p>

          <Image
            src="/imgs/logoAdaptapus.png"
            alt="Logo Adaptapus"
            width={72}
            height={72}
            className="mt-6 h-[72px] w-[72px] transition-transform duration-300 hover:scale-105"
          />
        </section>

        {/* MENSAGENS */}
        {erro && (
          <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="mb-5 rounded-xl border border-greenMain/30 bg-greenMain/10 px-4 py-3 text-sm text-greenMain">
            {sucesso}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NOME */}
          <div>
            <label
              htmlFor="nome"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-whiteMain"
            >
              <span className="h-0.5 w-5 rounded-full bg-orangeMain" />
              Nome
            </label>

            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blueThird"
              />

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
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

          {/* CADASTRAR */}
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
            {carregando ? "Criando conta..." : "Cadastrar"}

            {!carregando && <ArrowRight size={20} />}
          </button>
        </form>

        {/* LOGIN */}
        <div className="mt-7 flex items-center gap-3 text-sm text-blueThird">
          <span className="h-px flex-1 bg-blueSecond/60" />

          <span className="shrink-0">
            Já tem uma conta?{" "}
            <Link
              href="/pages/SignIn"
              className="font-semibold text-orangeSecond transition hover:text-orangeMain"
            >
              Entrar
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