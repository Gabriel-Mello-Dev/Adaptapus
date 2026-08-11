
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER!;

export default function RoomPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");

  async function createRoom() {
    try {
      setLoading(true);

      const response = await fetch(`${socketServer}/create-room`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Não foi possível criar a sala");
      }

      const data = await response.json();

      localStorage.setItem("adm", "true");

      router.push(`/pages/Room/Chat/${data.roomId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function enterRoom() {
    const codigo = roomId.trim();

    if (!codigo) return;

    localStorage.setItem("adm", "false");

    router.push(`/pages/Room/Chat/${codigo}`);
  }

  return (
    <main className="min-h-screen bg-[#150829] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1e1038] border border-[#332156] rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Salas
          </h1>

          <p className="text-purple-300 text-sm">
            Crie uma sala ou entre em uma já existente
          </p>
        </div>

        <div className="flex flex-col gap-6">

          {/* CRIAR SALA */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Criar uma sala
            </h2>

            <p className="text-sm text-purple-400 mb-3">
              Crie uma nova sala e seja o administrador.
            </p>

            <button
              onClick={createRoom}
              disabled={loading}
              className="
                w-full
                bg-purple-600
                hover:bg-purple-500
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
                py-3
                rounded-xl
                font-semibold
              "
            >
              {loading ? "Criando sala..." : "Criar sala"}
            </button>
          </section>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#332156]" />
            <span className="text-xs text-purple-500">
              OU
            </span>
            <div className="h-px flex-1 bg-[#332156]" />
          </div>

          {/* ENTRAR NA SALA */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Entrar em uma sala
            </h2>

            <p className="text-sm text-purple-400 mb-3">
              Digite o código recebido do administrador.
            </p>

            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  enterRoom();
                }
              }}
              placeholder="Código da sala"
              className="
                w-full
                bg-[#2a1750]
                border
                border-[#3d2769]
                text-white
                placeholder:text-purple-400
                px-4
                py-3
                rounded-xl
                outline-none
                focus:border-purple-400
                mb-3
              "
            />

            <button
              onClick={enterRoom}
              disabled={!roomId.trim()}
              className="
                w-full
                bg-[#2a1750]
                hover:bg-[#33195e]
                disabled:opacity-50
                disabled:cursor-not-allowed
                border
                border-[#3d2769]
                transition
                py-3
                rounded-xl
                font-semibold
              "
            >
              Entrar na sala
            </button>
          </section>

        </div>
      </div>
    </main>
  );
}
