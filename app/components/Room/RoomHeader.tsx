import { BackButton } from "../index";
import Image from "next/image";
import { useState } from "react";

type UsuarioOnline = {
  uid: string;
  nome: string;
  socketId: string;
};

interface RoomHeaderProps {
  roomId: string;
  userName: string;
  usuariosOnline: UsuarioOnline[];
}

export default function RoomHeader({
  roomId,
  userName,
  usuariosOnline,
}: RoomHeaderProps) {
  const [copiado, setCopiado] = useState(false);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  /*
   * COPIAR CÓDIGO
   */
  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(roomId);

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 1800);
    } catch (error) {
      console.error("Erro ao copiar código:", error);
    }
  }

  return (
    <>
      {/* MODAL DE COPIADO */}
      {copiado && (
        <div
          className="
            fixed
            top-5
            left-1/2
            -translate-x-1/2
            z-50
            flex
            items-center
            gap-2
            bg-orangeSecond
            border
            border-orangeMain
            shadow-xl
            rounded-xl
            px-4
            py-2.5
            text-sm
            text-white
          "
        >
          <Image
            src="/favicon.ico"
            alt="Logo Adaptapus"
            className="w-4 m-auto"
            height={4}
            width={4}
          />

          <span>Copiado</span>
        </div>
      )}

      <header className="w-screen bg-orangeMain text-whiteMain flex items-center justify-between p-4 px-12 h-20">
        <BackButton />

        <p className="text-2xl font-bold tracking-wide">
          Sala Compartilhada
        </p>

        {/* USUÁRIO + ONLINE */}
        <div className="relative">
          <button
            onClick={() => setMostrarUsuarios((prev) => !prev)}
            className="
              flex
              items-center
              gap-2
              hover:bg-white/10
              transition
              rounded-lg
              px-3
              py-2
            "
          >
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

            <span className="text-lg">
              {userName}
            </span>

            <span className="text-sm text-white/70">
              ({usuariosOnline.length} online)
            </span>
          </button>

          {/* LISTA DE USUÁRIOS */}
          {mostrarUsuarios && (
            <div
              className="
                absolute
                top-full
                right-0
                mt-2
                w-64
                bg-orangeSecond
                border
                border-orangeMain
                rounded-xl
                shadow-xl
                p-3
                z-40
              "
            >
              <p className="text-sm font-semibold text-white mb-3">
                Pessoas na sala
              </p>

              <div className="space-y-2">
                {usuariosOnline.map((usuario) => (
                  <div
                    key={usuario.socketId}
                    className="
                      flex
                      items-center
                      gap-2
                      px-2
                      py-1.5
                      rounded-lg
                      hover:bg-white/5
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-green-400 shrink-0" />

                    <span className="text-sm text-white truncate">
                      {usuario.nome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CÓDIGO DA SALA */}
        <div className="bg-greenMain rounded-xl p-4 flex items-center justify-between gap-4">
          <p className="text-sm text-white">
            Código da sala:
          </p>

          <span className="text-2xl font-bold tracking-[0.25em]">
            {roomId}
          </span>

          <button
            onClick={copiarCodigo}
            className="
              bg-white/10
              hover:bg-white/20
              transition
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
            "
          >
            Copiar
          </button>
        </div>
      </header>
    </>
  );
}