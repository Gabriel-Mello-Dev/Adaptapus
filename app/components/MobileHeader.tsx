"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Home,
  Brain,
  LogIn,
  Plus,
  User,
  Menu,
  X,
} from "lucide-react";

interface MobileHeaderProps {
  nome: string | null;
  logado: boolean | null;
  setModal: (value: "entrar" | "criar" | null) => void;
  isActive: (path: string) => boolean;
}

export default function MobileHeader({
  nome,
  logado,
  setModal,
  isActive,
}: MobileHeaderProps) {
    
    const [menuAberto, setMenuAberto] = useState(false);
  
    return (
    <>
      {/* HEADER MOBILE */}
      <nav className="flex h-16 items-center justify-between px-4 md:hidden">
        {/* MENU */}
        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white/10
            transition
            hover:bg-white/20
          "
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* NOME */}
        <div className="max-w-[55%] truncate text-center font-semibold">
          {logado && nome ? nome : "Não conectado"}
        </div>

        {/* LOGO */}
        <Image
          src="/imgs/logoAdaptapus.png"
          alt="Logo Adaptapus"
          height={44}
          width={44}
          className="h-11 w-11"
        />
      </nav>

      {/* MENU MOBILE */}
      {menuAberto && (
        <div className="absolute z-999 left-0 right-0 top-16 border-t border-orangeSecond/50 bg-orangeMain p-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-2">

            {/* HOME */}
            <Link
              href="/"
              onClick={() => setMenuAberto(false)}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  isActive("/")
                    ? "bg-white/20"
                    : "hover:bg-white/15"
                }
              `}
            >
              <Home size={20} />
              <span className="font-semibold">
                Home
              </span>
            </Link>

            {/* ADAPTAPUS */}
            <Link
              href="/pages/Adaptar"
              onClick={() => setMenuAberto(false)}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  isActive("/pages/Adaptar")
                    ? "bg-white/20"
                    : "hover:bg-white/15"
                }
              `}
            >
              <Brain size={20} />
              <span className="font-semibold">
                Adaptapus
              </span>
            </Link>

            {/* ENTRAR NA SALA */}
            <button
              type="button"
              onClick={() => {
                setModal("entrar");
                setMenuAberto(false);
              }}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                transition
                hover:bg-white/15
              "
            >
              <LogIn size={20} />

              <span className="font-semibold">
                Entrar na Sala
              </span>
            </button>

            {/* CRIAR SALA */}
            <button
              type="button"
              onClick={() => {
                setModal("criar");
                setMenuAberto(false);
              }}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                transition
                hover:bg-white/15
              "
            >
              <Plus size={20} />

              <span className="font-semibold">
                Criar Sala
              </span>
            </button>

            {/* PERFIL */}
            {logado === true && (
              <Link
                href="/pages/Perfil"
                onClick={() => setMenuAberto(false)}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 transition
                  ${
                    isActive("/pages/Perfil")
                      ? "bg-white/20"
                      : "hover:bg-white/15"
                  }
                `}
              >
                <User size={20} />

                <span className="font-semibold">
                  Perfil
                </span>
              </Link>
            )}

            {/* USUÁRIO NÃO LOGADO */}
            {logado === false && (
              <>
                <Link
                  href="/pages/SignIn"
                  onClick={() => setMenuAberto(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-blueMain
                    px-4
                    py-3
                    text-white
                    transition
                    hover:bg-blueMain/90
                  "
                >
                  <LogIn size={20} />

                  <span className="font-semibold">
                    Entrar
                  </span>
                </Link>

                <Link
                  href="/pages/SignUp"
                  onClick={() => setMenuAberto(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-greenMain
                    px-4
                    py-3
                    text-white
                    transition
                    hover:bg-greenMain/90
                  "
                >
                  <Plus size={20} />

                  <span className="font-semibold">
                    Criar Conta
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}