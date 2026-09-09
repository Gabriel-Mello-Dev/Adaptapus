"use client";

import { Header, Footer } from './components'
import { Hero } from './components/Home'

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-whiteMain flex flex-col overflow-hidden">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
