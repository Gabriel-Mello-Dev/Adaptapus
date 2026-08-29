import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react"

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
            bg-greenMain
            hover:bg-greenMain/90
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            py-3
            rounded-xl
            font-semibold
            flex
            justify-center
            items-center
            gap-4
            "
        >
            <Plus size={30} className="text-white"/>
            {loading ? "Criando sala..." : "Criar sala"}
        </button>
    )
  }