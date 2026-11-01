
"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

interface ModalEnunciadoProps {
  aberto: boolean;
  fechar: () => void;
  titulo: string;
  enunciado: string;
}

export default function ModalEnunciado({
  aberto,
  fechar,
  titulo,
  enunciado,
}: ModalEnunciadoProps) {
  return (
    <Dialog.Root open={aberto} onOpenChange={(open) => {
      if (!open) fechar();
    }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-100 bg-blueMain/75 backdrop-blur-sm" />

        <Dialog.Popup
          className="
            fixed left-1/2 top-1/2 z-101
            flex w-[calc(100%-2rem)] max-w-2xl
            max-h-[85dvh] -translate-x-1/2 -translate-y-1/2
            flex-col overflow-hidden
            rounded-2xl border border-greenMain
            bg-greenMain text-whiteMain
            shadow-2xl outline-none
          "
        >
          {/* CABEÇALHO */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-whiteMain/25 p-5 sm:p-6">
            <div className="min-w-0">
              <p className="mb-1 text-sm font-medium text-whiteMain/75">
                Enunciado original
              </p>

              <Dialog.Title className="text-xl font-bold sm:text-2xl">
                {titulo}
              </Dialog.Title>
            </div>

            <Dialog.Close
              aria-label="Fechar modal"
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-lg bg-whiteMain/15
                transition hover:bg-whiteMain/25
              "
            >
              <X size={20} />
            </Dialog.Close>
          </div>
          
          {/* ENUNCIADO COMPLETO */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div
            className="
              rounded-xl
              border border-whiteMain/15
              bg-[#24624F]
              p-5
              shadow-inner
              sm:p-6
            "
          >
              <Dialog.Description
              className="
                whitespace-pre-line
                wrap-break-word
                text-base
                leading-relaxed
                text-whiteMain
              "
              >
              {enunciado}
              </Dialog.Description>
          </div>
          </div>

          {/* RODAPÉ */}
          <div className="flex shrink-0 justify-end border-t border-whiteMain/25 p-4 sm:px-6">
            <Dialog.Close
              className="
                rounded-xl border border-whiteMain/40
                bg-whiteMain px-6 py-2.5
                font-semibold text-greenMain
                transition hover:bg-whiteMain/90
              "
            >
              Fechar
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
