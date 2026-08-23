"use client";

import { Header, Footer } from './components'
import { Hero } from './components/Home'

export default function Home() {
  return (
    <div className="min-w-full min-h-full bg-whiteMain">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
