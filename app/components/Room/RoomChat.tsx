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
    <div className="w-full max-w-3xl flex-1 bg-[#1e1038] border border-[#332156] rounded-2xl overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="bg-[#180b2e] border-b border-[#332156] px-5 py-3">
        <h2 className="text-lg font-semibold">Chat ao vivo</h2>
      </div>

      {/* MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-purple-400 mt-10 text-sm">
            Nenhuma mensagem ainda...
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={`${msg.uid}-${index}`}
            className="
              bg-[#2a1750]
              border
              border-[#3d2769]
              rounded-xl
              px-4
              py-3
              max-w-[80%]
            "
          >
            {/* USUÁRIO */}
            <div className="flex items-center justify-between gap-3 mb-1">
              <p className="font-semibold text-purple-300">{msg.nome}</p>

              <span className="text-xs text-purple-400">{msg.timeStamp}</span>
            </div>

            {/* MENSAGEM */}
            <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>

            {/* DENÚNCIA */}
            <button
              onClick={() => {
                setUsuarioDenunciado(msg.uid);
                setDenunciaUsuarioAberta(true);
              }}
              className="mt-2 text-xs text-red-400 hover:text-red-300"
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
          />
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-[#332156] flex gap-3 bg-[#180b2e]">
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
          "
          placeholder="Digite uma mensagem..."
        />

        <button
          onClick={sendMessage}
          className="
            bg-purple-600
            hover:bg-purple-500
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
