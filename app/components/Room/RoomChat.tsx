import { useEffect, useState } from "react";
import { DenunciaUsuario } from "@/app/components/Denuncias";
import { createClient } from "@/app/libs/supabase/client";

type ChatMessage = {
  uid: string;
  nome: string;
  message: string;
  timeStamp: string;
};

interface RoomChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function RoomChat({ messages, onSendMessage }: RoomChatProps) {
  const [user, setUser] = useState<{ id: string } | null>(null);

  const supabase = createClient();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);
  const [message, setMessage] = useState("");
  const [denunciaUsuarioAberta, setDenunciaUsuarioAberta] = useState(false);
  const [usuarioDenunciado, setUsuarioDenunciado] = useState("");

  function sendMessage() {
    if (!message.trim()) return;

    onSendMessage(message);

    setMessage("");
  }

  return (
    <div className="w-full flex-1 bg-blueMain border border-blueSecond rounded-2xl overflow-hidden flex flex-col">

    {/* HEADER */}
    <div className="bg-blueMain/80 border-b border-blueSecond px-5 py-3">
        <h2 className="text-lg font-semibold text-whiteMain">
        Chat ao vivo
        </h2>
    </div>

    {/* MENSAGENS */}
    <div className="flex-1 overflow-y-auto p-5 space-y-3">

        {messages.length === 0 && (
        <div className="text-center text-whiteMain/50 mt-10 text-sm">
            Nenhuma mensagem ainda...
        </div>
        )}

        {messages.map((msg, index) => (
        <div
            key={`${msg.uid}-${index}`}
            className="
            bg-blueSecond/20
            border
            border-blueSecond
            rounded-xl
            px-4
            py-3
            max-w-[80%]
            "
        >

            {/* USUÁRIO */}
            <div className="flex items-center justify-between gap-3 mb-1">
            <p className="font-semibold text-orangeSecond">
                {msg.nome}
            </p>

            <span className="text-xs text-whiteMain/50">
                {msg.timeStamp}
            </span>
            </div>

            {/* MENSAGEM */}
            <p className="whitespace-pre-line leading-relaxed text-whiteMain">
            {msg.message}
            </p>

            {/* DENÚNCIA */}
            <button
            onClick={() => {
                setUsuarioDenunciado(msg.uid);
                setDenunciaUsuarioAberta(true);
            }}
            className="
                mt-2
                text-xs
                text-orangeThird
                hover:text-orangeSecond
                transition
            "
            >
            Denunciar usuário
            </button>
        </div>
        ))}

        {/* MODAL */}
        {user && (
        <DenunciaUsuario
            aberto={denunciaUsuarioAberta}
            uid={user.id}
            duid={usuarioDenunciado}
            fechar={() => {
            setDenunciaUsuarioAberta(false);
            setUsuarioDenunciado("");
            }}
        /> )}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-blueSecond flex gap-3 bg-blueMain/80">

            <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                sendMessage();
                }
            }}
            className="
                flex-1
                bg-blueSecond/20
                border
                border-blueSecond
                text-whiteMain
                placeholder:text-whiteMain/40
                px-4
                py-3
                rounded-xl
                outline-none
                transition
                focus:border-orangeMain
            "
            placeholder="Digite uma mensagem..."
            />

            <button
            onClick={sendMessage}
            className="
                bg-greenMain
                hover:bg-greenMain/80
                text-whiteMain
                transition
                px-6
                rounded-xl
                font-semibold
            "
            >
            Enviar
            </button>
        </div>
    </div>
  );
}
