import Link from "next/link"

export default function Header() {

    return (
        <header className="w-full bg-purpleMain flex flex-row gap-4 px-16 p-4 justify-between items-center h-1/6">
            <Link href="/">
                <h1 className="text-2xl text-greenMain rounded-md">
                    Home
                </h1>
            </Link>

            <Link href="/pages/Adaptar">
                <h1 className="text-2xl text-greenMain">
                    Adaptil
                </h1>
            </Link>

            <Link href="/pages/Room">
                <h1 className="text-2xl text-greenMain">
                    Entrar na Sala
                </h1>
            </Link>

            <Link href="/pages/Room">
                <h1 className="text-2xl text-greenMain">
                    Criar Sala
                </h1>
            </Link>

            <Link href="/">
                <h1 className="text-2xl text-greenMain">
                    Perfil
                </h1>
            </Link>

            {/* Logo */}
            <img
            src="/imgs/logoAdaptil.png"
            alt="Logo Adaptil"
            className="w-14 transition-transform duration-300 hover:scale-105 hover:translate-x-1"
            />
        </header>
    )
}