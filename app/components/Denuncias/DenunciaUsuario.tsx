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
  nome: string;
  mensagem: string;
}

const supabase = createClient();

export default function DenunciaUsuario({
  aberto,
  fechar,
  uid,
  duid,
  nome,
  mensagem,
}: DenunciaUsuarioProps) {
  if (!aberto) return null;

  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);

  const denunciarUsuario = async () => {
    if (!motivo.trim() || enviando) return;

    setEnviando(true);

    const comentario = `${motivo.trim()} [ ${mensagem}`;

    const { error } = await supabase.from("denuncias_usuarios").insert({
      uid1: uid,
      uid2: duid,
      comentario,
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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blueMain/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-orangeSecond/50 bg-orangeSecond p-6 shadow-2xl">
        <h2 className="mb-2 text-xl font-bold text-whiteMain">
          Denunciar usuário
        </h2>

        <p className="mb-5 text-sm text-blueMain/80">
          Usuário:{" "}
          <span className="font-semibold text-whiteMain">
            {nome}
          </span>
        </p>

        <textarea
          placeholder="Digite o motivo da denúncia..."
          className="
            mb-4
            w-full
            resize-none
            rounded-xl
            border
            border-orangeMain
            bg-orangeMain/90
            p-3
            text-whiteMain
            placeholder:text-whiteMain/60
            outline-none
            transition
            focus:border-whiteMain/70
            focus:ring-1
            focus:ring-whiteMain/50
          "
          rows={4}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={fechar}
            disabled={enviando}
            className="
              flex-1
              rounded-xl
              bg-red-500
              px-4
              py-2.5
              font-semibold
              text-whiteMain/80
              transition
              hover:bg-red-400
              hover:text-whiteMain
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            onClick={denunciarUsuario}
            disabled={enviando || !motivo.trim()}
            className="
              flex-1
              rounded-xl
              bg-blueMain
              border
              border-blueSecond
              px-4
              py-2.5
              font-semibold
              text-whiteMain
              transition
              hover:bg-blueSecond
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {enviando ? "Enviando..." : "Enviar denúncia"}
          </button>
        </div>
      </div>
    </div>
    
  );
}
