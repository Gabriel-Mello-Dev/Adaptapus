"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="
        rounded-lg
        bg-gray-800
        text-white
        hover:bg-gray-700
        transition
        h-10
        w-20
        text-sm
        flex
        items-center
        justify-center
        gap-1
        md:h-16
        md:w-28
        md:text-md
      "
    >
      <ArrowLeft
        className="inline-block mr-1 md:mr-2"
        size={16}
      />
      Voltar
    </Link>
  );
}