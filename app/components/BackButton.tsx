"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="rounded-lg px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      Voltar
    </button>
  );
}