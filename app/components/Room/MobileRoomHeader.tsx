"use client";

import { BackButton } from "../index";
import Image from "next/image";
import { useState } from "react";

type UsuarioOnline = {
  uid: string;
  nome: string;
  socketId: string;
};

interface MobileRoomHeaderProps {
  roomId: string;
  userName: string;
  usuariosOnline: UsuarioOnline[];
  onCopyCode: () => void;
}

export default function MobileRoomHeader({
  roomId,
  userName,
  usuariosOnline,
  onCopyCode,
}: MobileRoomHeaderProps) {
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  return (
    <header className="relative z-50 flex w-full flex-col bg-orangeMain text-whiteMain shadow-lg md:hidden">
      
      {/* LINHA PRINCIPAL */}
      <div className="flex h-16 w-full items-center justify-between gap-3 px-4">

        {/* VOLTAR */}
        <div className="shrink-0">
          <BackButton />
        </div>

        {/* USUÁRIO + ONLINE */}
        <div className="relative min-w-0">
          <button
            onClick={() =>
              setMostrarUsuarios((prev) => !prev)
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-3
              py-2
              transition
              hover:bg-white/10
            "
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-400" />

            <span className="max-w-28 truncate text-sm font-semibold">
              {userName}
            </span>

            <span className="whitespace-nowrap text-xs text-whiteMain/70">
              ({usuariosOnline.length})
            </span>
          </button>

          {/* LISTA DE USUÁRIOS */}
          {mostrarUsuarios && (
            <div
              className="
                absolute
                left-1/2
                top-full
                z-[60]
                mt-2
                w-64
                -translate-x-1/2
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

        {/* LOGO */}
        <Image
          src="/imgs/logoAdaptapus.png"
          alt="Logo Adaptapus"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0"
        />
      </div>

      {/* CÓDIGO DA SALA */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-greenMain px-3 py-2.5">
          
          <div className="flex min-w-0 flex-col">
            <span className="text-[11px] text-whiteMain/70">
              Código da sala
            </span>

            <span className="truncate text-lg font-bold tracking-[0.18em]">
              {roomId}
            </span>
          </div>

          <button
            onClick={onCopyCode}
            className="
              shrink-0
              rounded-lg
              bg-white/10
              px-3
              py-2
              text-xs
              font-medium
              transition
              hover:bg-white/20
            "
          >
            Copiar
          </button>
        </div>
      </div>
    </header>
  );
}