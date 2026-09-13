"use client";

import Link from "next/link";
import Image from "next/image";

export default function Banido() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-whiteMain px-4">
      <div className="w-full max-w-md rounded-2xl bg-blueMain p-8 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <Image
            src="/imgs/logoAdaptapus.png"
            alt="Logo Adaptapus"
            width={80}
            height={80}
          />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white">
          Conta desativada
        </h1>

        <p className="mb-6 text-white/90">
          Sua conta foi desativada e, no momento, você não pode acessar a
          plataforma.
        </p>

        <p className="mb-6 text-white/90">
          Caso acredite que isso tenha acontecido por engano ou queira
          solicitar uma revisão da situação, entre em contato conosco pelo
          e-mail:
        </p>

        <a
          href="mailto:fragmacore@gmail.com"
          className="mb-6 block font-semibold text-orangeMain hover:text-orangeSecond"
        >
          fragmacore@gmail.com
        </a>

        <div className="rounded-lg bg-white/10 p-4 text-left text-sm text-white/90">
          <p className="mb-2 font-semibold text-white">
            No e-mail, informe:
          </p>

          <ul className="list-disc space-y-1 pl-5">
            <li>Nome utilizado na conta</li>
            <li>E-mail utilizado para acessar a conta</li>
            <li>Motivo pelo qual deseja solicitar a revisão</li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-white/70">
          Analisaremos a situação e retornaremos assim que possível.
        </p>

        <Link
          href="/pages/SignIn"
          className="mt-6 inline-block rounded-lg bg-greenMain px-5 py-2 font-semibold text-white transition hover:bg-greenMain/85"
        >
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}