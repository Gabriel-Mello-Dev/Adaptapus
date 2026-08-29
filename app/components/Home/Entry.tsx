import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react"

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
              placeholder:text-white/80
              rounded-2xl
              px-5
              py-4
              text-lg
              outline-none
              focus:ring-2
              focus:ring-blue-400
              transition-all
            "
          />

          <button
            onClick={enterRoom}
            disabled={loading}
            className="
              w-full
              bg-linear-to-r
              from-blue-700
              via-blue-500
              to-blue-600
              hover:from-blue-900
              hover:via-blue-600
              hover:to-blue-700
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
            <LogIn size={30} />
            
          </button>

        </div>
  )
};