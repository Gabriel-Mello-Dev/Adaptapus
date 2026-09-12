import { useEffect, useState, useRef } from "react";
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
  const [nomeUsuarioDenunciado, setNomeUsuarioDenunciado] = useState("");

  function sendMessage() {
    if (!message.trim()) return;

    onSendMessage(message);

    setMessage("");
  }

  const [temMensagensAcima, setTemMensagensAcima] = useState(false);

  const mensagensRef = useRef<HTMLDivElement>(null);
  const estavaNoFinalRef = useRef(true);

  function verificarScroll(e: React.UIEvent<HTMLDivElement>) {
    const container = e.currentTarget;

    const estaNoFinal =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      50;

    estavaNoFinalRef.current = estaNoFinal;

    setTemMensagensAcima(container.scrollTop > 0);
  }

  useEffect(() => {
    const container = mensagensRef.current;

    if (!container) return;

    if (estavaNoFinalRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

return (
  <div className="w-full h-96 bg-blueMain border border-blueSecond rounded-2xl overflow-hidden flex flex-col">

    {/* HEADER */}
    <div className="bg-blueMain/80 border-b border-blueSecond px-5 py-3 shrink-0">
      <h2 className="text-lg font-semibold text-whiteMain">
        Chat ao vivo
      </h2>
    </div>

    {/* MENSAGENS */}
    <div className="relative flex-1 min-h-0">

      {/* SOMBRA SUPERIOR */}
      {temMensagensAcima && (
        <div className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none bg-linear-to-b from-black/30 to-transparent" />
      )}

      <div
        ref={mensagensRef}
        onScroll={verificarScroll}
        className="h-full overflow-y-auto p-5 space-y-3"
      >
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
            {user && msg.uid !== user.id && (
              <button
                onClick={() => {
                  setUsuarioDenunciado(msg.uid);
                  setNomeUsuarioDenunciado(msg.nome);
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
            )}
          </div>
        ))}
      </div>
    </div>

    {/* MODAL DE DENÚNCIA */}
    {user && (
      <DenunciaUsuario
        aberto={denunciaUsuarioAberta}
        uid={user.id}
        duid={usuarioDenunciado}
        nome={nomeUsuarioDenunciado}
        fechar={() => {
          setDenunciaUsuarioAberta(false);
          setUsuarioDenunciado("");
          setNomeUsuarioDenunciado("");
        }}
      />
    )}

    {/* INPUT */}
    <div className="p-4 border-t border-blueSecond flex gap-3 bg-blueMain/80 shrink-0">
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
