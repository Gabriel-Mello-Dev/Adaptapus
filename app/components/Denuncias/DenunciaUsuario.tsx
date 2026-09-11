/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createClient } from "@/app/libs/supabase/client";
import { useState } from "react";

interface DenunciaUsuarioProps {
  aberto: boolean;
  fechar: () => void;
  duid: string;
  uid: string;
}

const supabase = createClient();

export default function DenunciaUsuario({
  aberto,
  fechar,
  uid,
  duid,
}: DenunciaUsuarioProps) {
  if (!aberto) return null;
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);

  const denunciarUsuario = async () => {
    const { error } = await supabase.from("denuncias_usuarios").insert({
      uid1: uid,
      uid2: duid,
      comentario: motivo.trim(),
      resolved_by: null,
    });

    if (error) {
      console.error("Erro ao enviar denúncia:", error);
      setEnviando(false);
      return;
    }

    setMotivo("");
    setEnviando(false);
    fechar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#3d2769] bg-[#1e1038] p-6 shadow-2xl">
        <h2 className="mb-2 text-xl font-bold text-white">Denunciar usuário</h2>

        <p className="mb-5 text-sm text-purple-300">
          Usuário: <span className="font-semibold text-purple-200">{uid}</span>
        </p>

        <textarea
          placeholder="Digite o motivo da denúncia..."
          className="
        mb-4
        w-full
        resize-none
        rounded-xl
        border
        border-[#3d2769]
        bg-[#2a1750]
        p-3
        text-white
        placeholder:text-purple-400
        outline-none
        transition
        focus:border-purple-400
        focus:ring-1
        focus:ring-purple-400
      "
          rows={4}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={fechar}
            className="
          flex-1
          rounded-xl
          border
          border-[#3d2769]
          bg-[#2a1750]
          px-4
          py-2.5
          font-semibold
          text-purple-300
          transition
          hover:bg-[#35205f]
          hover:text-white
        "
          >
            Cancelar
          </button>

          <button
            onClick={denunciarUsuario}
            className="
          flex-1
          rounded-xl
          bg-purple-600
          px-4
          py-2.5
          font-semibold
          text-white
          transition
          hover:bg-purple-500
        "
          >
            Enviar denúncia
          </button>
        </div>
      </div>
    </div>
  );
}
