"use client";

import Link  from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {

  return (
    <Link
      href="/"
      className="rounded-lg px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      < ArrowLeft className="inline-block mr-2" size={16} />
      Voltar
    </Link>
  );
}