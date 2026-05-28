"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoomPage() {
  const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER!;

  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function enterRoom() {
    if (!roomId) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${socketServer}/room/${roomId}`
      );

      const data = await response.json();

      if (!data.exists) {
        alert("Sala não encontrada");
        return;
      }

      router.push(`/pages/Room/Chat/${roomId}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao entrar na sala");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-950 flex items-center justify-center p-6">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Entrar na Sala
          </h1>

          <p className="text-purple-200">
            Digite o código da sala para participar
          </p>
        </div>

        <div className="space-y-5">
          
          <input
            value={roomId}
            onChange={(e) =>
              setRoomId(
                e.target.value.toUpperCase()
              )
            }
            placeholder="Código da sala"
            className="
              w-full
              bg-white/10
              border
              border-white/10
              text-white
              placeholder:text-purple-300
              rounded-2xl
              px-5
              py-4
              text-lg
              outline-none
              focus:ring-2
              focus:ring-purple-400
              transition-all
            "
          />

          <button
            onClick={enterRoom}
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-purple-500
              via-violet-500
              to-fuchsia-500
              hover:from-purple-400
              hover:via-violet-400
              hover:to-fuchsia-400
              disabled:opacity-70
              disabled:cursor-not-allowed
              text-white
              font-bold
              text-lg
              py-4
              rounded-2xl
              shadow-lg
              shadow-purple-900/50
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
              flex
              items-center
              justify-center
              gap-3
            "
          >
            {loading && (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}

            {loading
              ? "Entrando..."
              : "Entrar"}
          </button>

        </div>
      </div>
    </div>
  );
}