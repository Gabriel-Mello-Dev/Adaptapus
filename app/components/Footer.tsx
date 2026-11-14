import Image from "next/image";
import Link from "next/link";

const linksInstitucionais = [
    { href: "/sobre", label: "Sobre" },
    { href: "/privacidade", label: "Privacidade" },
    { href: "/termos", label: "Termos" },
    { href: "/fale-conosco", label: "Fale conosco" },
];

export default function Footer() {
    return (
        <footer className="relative w-full shrink-0 overflow-hidden bg-blueMain text-whiteMain">
            <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">

                {/* DETALHE SUPERIOR */}
                <div className="pointer-events-none absolute right-0 top-0 opacity-20">
                    <svg
                        width="110"
                        height="110"
                        viewBox="0 0 110 110"
                        fill="none"
                    >
                        <circle
                            cx="95"
                            cy="15"
                            r="32"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-blueSecond"
                        />
                        <circle
                            cx="95"
                            cy="15"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-blueSecond"
                        />
                        <circle
                            cx="95"
                            cy="15"
                            r="8"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-blueSecond"
                        />
                    </svg>
                </div>

                {/* DETALHE INFERIOR */}
                <div className="pointer-events-none absolute bottom-0 left-0 opacity-20">
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <path
                            d="M0 88C18 72 28 90 42 76C55 63 65 74 78 59C88 48 95 52 100 46"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-blueSecond"
                        />

                        <circle
                            cx="22"
                            cy="72"
                            r="5"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-blueSecond"
                        />
                    </svg>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src="/imgs/logoAdaptapus.png"
                        alt="Adaptapus"
                        className="w-7 shrink-0"
                        height={28}
                        width={28}
                    />

                    <span className="text-sm">
                        Adaptapus™
                    </span>
                </div>

                <p className="text-sm leading-relaxed">
                    @Copyright - 2026 - Todos os direitos reservados
                </p>

                <nav
                    aria-label="Links institucionais"
                    className="flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm sm:justify-end"
                >
                    {linksInstitucionais.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="transition hover:text-orangeSecond"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

            </div>
        </footer>
    );
}