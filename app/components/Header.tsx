import Link from "next/link";
import Image from "next/image";
import {
    Home,
    Brain,
    LogIn,
    Plus,
    User
} from "lucide-react";

export default function Header() {
    return (
        <header className="w-full bg-brownMain shadow-lg text-goldMain">
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
                        <span className="font-semibold">Adaptil</span>
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
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 transition hover:opacity-80"
                    >
                        <User size={22} />
                        <span className="font-semibold">Perfil</span>
                    </Link>
                </div>

                <Image
                    src="/imgs/logoAdaptil.png"
                    alt="Logo Adaptil"
                    height={56}
                    width={56}
                    className="w-14 transition-transform duration-300 hover:scale-105"
                />

            </nav>
        </header>
    );
}