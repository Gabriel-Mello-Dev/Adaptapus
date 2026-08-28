"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Home,
    Brain,
    LogIn,
    Plus,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";

export default function Header() {
    const [nome, setNome] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();

        async function pegarUsuario() {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) {
                setNome(null);
                return;
            }

            const { data, error } = await supabase
                .from("usuarios")
                .select("nome")
                .eq("uid", user.id)
                .single();

            if (error) {
                console.error("Erro ao buscar usuário:", error);
                return;
            }

            setNome(data?.nome ?? null);
        }

        pegarUsuario();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(() => {
            pegarUsuario();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <header className="w-full bg-orangeMain shadow-lg text-whiteSecond">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 transition hover:bg-white/15"
                    >
                        <Home size={22} />
                        <span className="font-semibold">Home</span>
                    </Link>

                    <Link
                        href="/pages/Adaptar"
                        className="flex items-center gap-2 px-4 py-2 transition hover:opacity-80"
                    >
                        <Brain size={22} />
                        <span className="font-semibold">Adaptapus</span>
                    </Link>

                    <Link
                        href="/pages/Room"
                        className="flex items-center gap-2 px-4 py-2 transition hover:opacity-80"
                    >
                        <LogIn size={22} />
                        <span className="font-semibold">Entrar na Sala</span>
                    </Link>

                    <Link
                        href="/pages/Room"
                        className="flex items-center gap-2 px-4 py-2 transition hover:opacity-80"
                    >
                        <Plus size={22} />
                        <span className="font-semibold">Criar Sala</span>
                    </Link>

                    <Link
                        href="/pages/SignUp"
                        className="flex items-center gap-2 px-4 py-2 transition hover:opacity-80"
                    >
                        <User size={22} />
                        <span className="font-semibold">Perfil</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {nome && (
                        <span className="font-semibold">
                            {nome}
                        </span>
                    )}

                    <Image
                        src="/imgs/logoAdaptapus.png"
                        alt="Logo Adaptapus"
                        height={56}
                        width={56}
                        className="w-14 transition-transform duration-300 hover:scale-105"
                    />
                </div>

            </nav>
        </header>
    );
}