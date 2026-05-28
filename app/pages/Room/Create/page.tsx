"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const socketServer =
  process.env.NEXT_PUBLIC_SOCKET_SERVER!;

export default function CreateRoomPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function createRoom() {
    try {
      setLoading(true);

      const response = await fetch(
        `${socketServer}/create-room`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      localStorage.setItem("adm", "true");
      router.push(`/pages/Room/Chat/${data.roomId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Criar Sala
          </h1>

          <p className="text-purple-200">
            Crie uma nova sala e compartilhe com seus amigos
          </p>
        </div>

        <button
          onClick={createRoom}
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
            ? "Criando sala..."
            : "Criar sala"}
        </button>

      </div>
    </div>
  );
}