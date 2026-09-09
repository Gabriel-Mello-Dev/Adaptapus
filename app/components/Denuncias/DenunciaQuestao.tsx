"use client";

interface DenunciaQuestaoProps {
  aberto: boolean;
  fechar: () => void;
}

export default function DenunciaQuestao({
  aberto,
  fechar,
}: DenunciaQuestaoProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Denunciar questão</h2>

        <textarea
          placeholder="Digite o motivo da denúncia..."
          className="mb-4 w-full rounded-lg border p-3"
          rows={4}
        />

        <button
          onClick={fechar}
          className="w-full rounded-lg bg-orange-500 px-4 py-2 text-white"
        >
          Enviar denúncia
        </button>
      </div>
    </div>
  );
}