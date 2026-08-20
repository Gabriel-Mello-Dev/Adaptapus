"use client";

import { Header, Footer } from './components'
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-w-full min-h-full bg-whiteMain">
      <Header />
      <main className="min-h-160 flex  flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-bold text-greenMain text-center mb-8">
            Adaptil
          </h1>
          <h2 className="text-2xl font-bold text-greenMain text-center mb-8">
            O que vamos fazer hoje?
          </h2>

          <div className="grid grid-cols-2 gap-5 items-center justify-center">
            <Link href="/pages/Adaptar" className="col-span-2 justify-center">
              <button className="bg-orangeMain text-white p-4 text-xl w-full rounded-3xl">
                Adaptar Questões
              </button> 
            </Link>
            <Link href="/pages/Room">
              <button className="bg-orangeMain text-white p-4 text-xl w-96 rounded-3xl">
                Entrar na Sala
              </button> 
            </Link>
            <Link href="/pages/Room">
              <button className="bg-orangeMain text-white p-4 text-xl w-96 rounded-3xl">
                Criar Sala
              </button> 
            </Link>
          </div>
      </main>
      <Footer />
    </div>
  );
}
