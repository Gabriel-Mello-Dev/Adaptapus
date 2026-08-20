"use client";


import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
        <img
          src="/imgs/logoAdaptil.png"
          alt="Logo Adaptil"
          className="w-24 mx-auto mb-4 transition-transform duration-300 hover:scale-105 hover:translate-x-1"
        />
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Adaptil- Menu Principal
        </h1>

        <div className="flex flex-col gap-5">
          <Link href="/pages/Room">
            <button className="w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-400 transition-all duration-200 text-white text-lg font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              Chat ao vivo (em desenvolvimento)
            </button>
          </Link>

          <Link href="/pages/Adaptar">
            <button className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all duration-200 text-white text-lg font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              Adaptar Questões
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
