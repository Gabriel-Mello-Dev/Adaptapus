"use client";

import { createClient } from "@/app/libs/supabase/client";
import { useState } from "react";

interface DenunciaQuestaoProps {
  aberto: boolean;
  fechar: () => void;
  questao: string;
}

const supabase = createClient();

export default function DenunciaQuestao({
  aberto,
  fechar,
  questao,
}: DenunciaQuestaoProps) {
  const [enviando, setEnviando] = useState(false);
  const [motivo, setMotivo] = useState("");

  if (!aberto) return null;

  const enviarDenuncia = async () => {
    if (!motivo.trim()) return;

    setEnviando(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Usuário não autenticado:", userError);
      setEnviando(false);
      return;
    }

    const { error } = await supabase.from("denuncias_questoes").insert({
      uid: user.id,
      questao: questao,
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
        <h2 className="mb-2 text-xl font-bold text-white">Denunciar questão</h2>

        <p className="mb-5 text-sm text-purple-300">
          Informe o motivo da denúncia para que a questão possa ser analisada.
        </p>

        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
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
        />

        <div className="flex gap-3">
          <button
            onClick={fechar}
            disabled={enviando}
            className="
              flex-1
              rounded-xl
              border
              border-[#3d2769]
              bg-[#2a1750]
              px-4
              py-2.5
              font-semibold
              text-purple-200
              transition
              hover:bg-[#33195e]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            onClick={enviarDenuncia}
            disabled={enviando || !motivo.trim()}
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
