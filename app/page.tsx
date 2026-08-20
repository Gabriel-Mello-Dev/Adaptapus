"use client";

import { Header, Footer } from './components'
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-w-full min-h-full bg-whiteMain">
      <Header />
      <main className="min-h-160 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
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
      <Footer />
    </div>
  );
}
