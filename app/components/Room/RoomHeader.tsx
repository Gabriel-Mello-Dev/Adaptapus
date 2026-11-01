"use client";

import { BackButton } from "../index";
import Image from "next/image";
import { useState } from "react";
import { MobileRoomHeader } from "./index";

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
            z-[100]
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-xl
            border
            border-orangeMain
            bg-orangeSecond
            px-4
            py-2.5
            text-sm
            text-whiteMain
            shadow-xl
          "
        >
          <Image
            src="/favicon.ico"
            alt="Logo Adaptapus"
            className="m-auto w-4"
            height={16}
            width={16}
          />

          <span>Copiado</span>
        </div>
      )}

      {/* DESKTOP */}
      <header className="relative z-50 hidden h-20 w-full items-center justify-between bg-orangeMain px-12 text-whiteMain shadow-lg md:flex">
        <BackButton />

        <p className="text-2xl font-bold tracking-wide">
          Sala Compartilhada
        </p>

        {/* USUÁRIO + ONLINE */}
        <div className="relative">
          <button
            onClick={() =>
              setMostrarUsuarios((prev) => !prev)
            }
            className="
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              transition
              hover:bg-white/10
            "
          >
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

            <span className="text-lg">
              {userName}
            </span>

            <span className="text-sm text-whiteMain/70">
              ({usuariosOnline.length} online)
            </span>
          </button>

          {/* LISTA DE USUÁRIOS */}
          {mostrarUsuarios && (
            <div
              className="
                absolute
                right-0
                top-full
                z-40
                mt-2
                w-64
                rounded-xl
                border
                border-orangeMain
                bg-orangeSecond
                p-3
                shadow-xl
              "
            >
              <p className="mb-3 text-sm font-semibold text-whiteMain">
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
                      rounded-lg
                      px-2
                      py-1.5
                      transition
                      hover:bg-white/10
                    "
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />

                    <span className="truncate text-sm text-whiteMain">
                      {usuario.nome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CÓDIGO DA SALA */}
        <div className="flex items-center justify-between gap-4 rounded-xl bg-greenMain p-4">
          <p className="text-sm text-whiteMain">
            Código da sala:
          </p>

          <span className="text-2xl font-bold tracking-[0.25em]">
            {roomId}
          </span>

          <button
            onClick={copiarCodigo}
            className="
              rounded-lg
              bg-white/10
              px-4
              py-2
              text-sm
              font-medium
              transition
              hover:bg-white/20
            "
          >
            Copiar
          </button>
        </div>
      </header>

      {/* MOBILE */}
      <MobileRoomHeader
        roomId={roomId}
        userName={userName}
        usuariosOnline={usuariosOnline}
        onCopyCode={copiarCodigo}
      />
    </>
  );
}