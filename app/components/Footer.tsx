import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-blueMain text-whiteMain">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-8">

                <div className="flex items-center gap-2">
                    <Image
                        src="/imgs/logoAdaptil.png"
                        alt="Adaptil"
                        className="w-7"
                        height={28}
                        width={28}
                    />

                    <span className="text-sm">
                        Adaptapus™
                    </span>
                </div>

                <p className="text-sm">
                    @Copyright - 2026 - Todos os direitos reservados
                </p>

            </div>
        </footer>
    );
}