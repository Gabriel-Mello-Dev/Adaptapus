import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoom() {

    const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER!;

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

    return (
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
    )
  }