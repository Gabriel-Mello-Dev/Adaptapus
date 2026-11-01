import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react"
import { checkLoggedUser } from "@/app/libs/auth/authservices";

export default function CreateRoom() {

    const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER!;

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function createRoom() {
        try {
        setLoading(true);

        const user = await checkLoggedUser();

        if (!user) {
            router.push("/pages/SignIn");
            return;
        }

        const response = await fetch(`${socketServer}/create-room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: user.id,
            }),
        });

        if (!response.ok) {
            throw new Error("Não foi possível criar a sala");
        }

        const data = await response.json();

        /*
         * Remove a chave antiga, que deixava qualquer usuário
         * que já criou uma sala como admin em todas as salas.
         */
        localStorage.removeItem("adm");

        /*
         * Guarda o criador da sala. Somente este UID será
         * considerado admin nesta sala.
         */
        localStorage.setItem(
            `adm:${data.roomId.toUpperCase()}`,
            user.id,
        );

        router.push(`/pages/Room/${data.roomId}`);
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