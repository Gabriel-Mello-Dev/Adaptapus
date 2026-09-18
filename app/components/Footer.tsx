import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-blueMain text-whiteMain">
            <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">

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

            </div>
        </footer>
    );
}