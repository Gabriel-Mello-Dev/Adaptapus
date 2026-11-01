import { ActionCard } from "./index";

import { ModalActions } from "@/app/components";

import { useState } from "react";

import {
    Brain,
    LogIn,
    Plus,
} from "lucide-react";

export default function Hero() {

    const [modal, setModal] = useState<"entrar" | "criar" | null>(null);

    return (
        <main className="relative z-0 flex flex-1 flex-col items-center justify-center overflow-hidden">

            {/* DECORAÇÕES SVG */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

                {/* BOLHAS SUPERIORES - ESQUERDA */}
                <svg
                    className="absolute left-[2%] top-[12%] h-32 w-32 text-orangeSecond/25 sm:left-[8%] sm:top-[18%]"
                    viewBox="0 0 140 140"
                    fill="none"
                >
                    <circle
                        cx="28"
                        cy="32"
                        r="5"
                        fill="currentColor"
                    />
                    <circle
                        cx="68"
                        cy="52"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="108"
                        cy="24"
                        r="4"
                        fill="currentColor"
                    />
                    <circle
                        cx="95"
                        cy="92"
                        r="11"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="42"
                        cy="108"
                        r="3"
                        fill="currentColor"
                    />
                </svg>

                {/* BOLHAS SUPERIORES - DIREITA */}
                <svg
                    className="absolute right-[2%] top-[14%] h-36 w-36 text-greenMain/25 sm:right-[7%] sm:top-[18%]"
                    viewBox="0 0 150 150"
                    fill="none"
                >
                    <circle
                        cx="32"
                        cy="28"
                        r="4"
                        fill="currentColor"
                    />
                    <circle
                        cx="75"
                        cy="48"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="116"
                        cy="34"
                        r="5"
                        fill="currentColor"
                    />
                    <circle
                        cx="108"
                        cy="92"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="55"
                        cy="112"
                        r="4"
                        fill="currentColor"
                    />
                </svg>

                {/* BOLHAS CENTRAIS - ESQUERDA */}
                <svg
                    className="absolute left-[1%] top-[45%] h-28 w-28 text-orangeMain/20 sm:left-[6%] sm:top-[42%]"
                    viewBox="0 0 120 120"
                    fill="none"
                >
                    <circle
                        cx="25"
                        cy="35"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="62"
                        cy="22"
                        r="3"
                        fill="currentColor"
                    />
                    <circle
                        cx="82"
                        cy="62"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="38"
                        cy="88"
                        r="4"
                        fill="currentColor"
                    />
                </svg>

                {/* BOLHAS CENTRAIS - DIREITA */}
                <svg
                    className="absolute right-[1%] top-[48%] h-28 w-28 text-orangeSecond/25 sm:right-[6%] sm:top-[44%]"
                    viewBox="0 0 120 120"
                    fill="none"
                >
                    <circle
                        cx="25"
                        cy="35"
                        r="4"
                        fill="currentColor"
                    />
                    <circle
                        cx="62"
                        cy="25"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="90"
                        cy="67"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="44"
                        cy="93"
                        r="3"
                        fill="currentColor"
                    />
                </svg>

                {/* ALGAS / CORAIS - ESQUERDA */}
                <svg
                    className="absolute -bottom-14 -left-10 h-80 w-80 text-orangeMain/70"
                    viewBox="0 0 320 320"
                    fill="none"
                >
                    {/* Coral principal */}
                    <path
                        d="
                            M18 315
                            C18 282 27 254 40 230
                            C54 205 46 183 29 165
                            M40 230
                            C63 220 82 199 88 174
                            M43 217
                            C24 207 14 191 12 171
                            M54 194
                            C78 180 92 157 98 132
                            M35 244
                            C17 239 5 225 2 207
                            M67 164
                            C72 145 79 129 94 117
                        "
                        stroke="currentColor"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Coral secundário */}
                    <path
                        d="
                            M72 315
                            C72 282 83 259 95 235
                            C108 210 118 184 119 158
                            M95 235
                            C118 226 138 207 147 182
                            M105 211
                            C86 199 79 180 79 160
                            M119 177
                            C140 166 152 147 157 124
                        "
                        stroke="currentColor"
                        strokeWidth="9"
                        strokeLinecap="round"
                    />

                    {/* Algas azuis */}
                    <path
                        d="
                            M126 315
                            C108 276 113 245 132 216
                            C151 188 147 159 136 133
                            C127 110 134 86 151 68
                            C159 59 163 47 159 34
                        "
                        stroke="#27314b"
                        strokeWidth="11"
                        strokeLinecap="round"
                    />

                    <path
                        d="
                            M155 315
                            C141 278 148 251 163 228
                            C180 201 182 176 175 150
                            C169 128 174 104 190 84
                            C197 75 201 64 198 51
                        "
                        stroke="#27314b"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    <path
                        d="
                            M183 315
                            C173 286 180 262 193 242
                            C208 220 216 196 211 170
                            C206 146 213 126 227 108
                        "
                        stroke="#27314b"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />

                    {/* Vegetação baixa */}
                    <path
                        d="
                            M0 300
                            C35 278 63 280 93 295
                            C122 309 147 307 177 291
                            C205 276 229 279 258 296
                            C280 309 299 311 320 302
                            L320 320
                            L0 320
                            Z
                        "
                        fill="#3c9d81"
                        opacity="0.32"
                    />

                    {/* Base coral */}
                    <path
                        d="
                            M0 307
                            C28 296 50 299 72 309
                            C96 320 117 319 140 309
                            C163 299 188 298 211 308
                            C236 318 267 317 320 301
                            L320 320
                            L0 320
                            Z
                        "
                        fill="currentColor"
                        opacity="0.35"
                    />
                </svg>

                {/* ALGAS / CORAIS - DIREITA */}
                <svg
                    className="absolute -bottom-14 -right-10 h-80 w-80 scale-x-[-1] text-orangeSecond/75"
                    viewBox="0 0 320 320"
                    fill="none"
                >
                    {/* Coral principal */}
                    <path
                        d="
                            M18 315
                            C18 282 27 254 40 230
                            C54 205 46 183 29 165
                            M40 230
                            C63 220 82 199 88 174
                            M43 217
                            C24 207 14 191 12 171
                            M54 194
                            C78 180 92 157 98 132
                            M35 244
                            C17 239 5 225 2 207
                            M67 164
                            C72 145 79 129 94 117
                        "
                        stroke="currentColor"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Coral secundário */}
                    <path
                        d="
                            M72 315
                            C72 282 83 259 95 235
                            C108 210 118 184 119 158
                            M95 235
                            C118 226 138 207 147 182
                            M105 211
                            C86 199 79 180 79 160
                            M119 177
                            C140 166 152 147 157 124
                        "
                        stroke="currentColor"
                        strokeWidth="9"
                        strokeLinecap="round"
                    />

                    {/* Algas azuis */}
                    <path
                        d="
                            M126 315
                            C108 276 113 245 132 216
                            C151 188 147 159 136 133
                            C127 110 134 86 151 68
                            C159 59 163 47 159 34
                        "
                        stroke="#27314b"
                        strokeWidth="11"
                        strokeLinecap="round"
                    />

                    <path
                        d="
                            M155 315
                            C141 278 148 251 163 228
                            C180 201 182 176 175 150
                            C169 128 174 104 190 84
                            C197 75 201 64 198 51
                        "
                        stroke="#27314b"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    <path
                        d="
                            M183 315
                            C173 286 180 262 193 242
                            C208 220 216 196 211 170
                            C206 146 213 126 227 108
                        "
                        stroke="#27314b"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />

                    {/* Vegetação baixa */}
                    <path
                        d="
                            M0 300
                            C35 278 63 280 93 295
                            C122 309 147 307 177 291
                            C205 276 229 279 258 296
                            C280 309 299 311 320 302
                            L320 320
                            L0 320
                            Z
                        "
                        fill="#3c9d81"
                        opacity="0.32"
                    />

                    {/* Base coral */}
                    <path
                        d="
                            M0 307
                            C28 296 50 299 72 309
                            C96 320 117 319 140 309
                            C163 299 188 298 211 308
                            C236 318 267 317 320 301
                            L320 320
                            L0 320
                            Z
                        "
                        fill="currentColor"
                        opacity="0.35"
                    />
                </svg>

                {/* BOLHAS INFERIORES - ESQUERDA */}
                <svg
                    className="absolute bottom-[17%] left-[15%] h-28 w-28 text-orangeSecond/30"
                    viewBox="0 0 120 120"
                    fill="none"
                >
                    <circle
                        cx="35"
                        cy="78"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="70"
                        cy="48"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="92"
                        cy="24"
                        r="4"
                        fill="currentColor"
                    />
                </svg>

                {/* BOLHAS INFERIORES - DIREITA */}
                <svg
                    className="absolute bottom-[18%] right-[14%] h-28 w-28 text-orangeMain/30"
                    viewBox="0 0 120 120"
                    fill="none"
                >
                    <circle
                        cx="35"
                        cy="78"
                        r="5"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="70"
                        cy="48"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="92"
                        cy="24"
                        r="4"
                        fill="currentColor"
                    />
                </svg>

            </div>

            {/* HERO */}
            <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center bg-whiteMain px-6 pb-6 pt-14 text-center">

                <h1 className="text-6xl font-bold text-orangeMain">
                    Adaptapus
                </h1>

                <div className="my-2 flex items-center gap-4">
                    <span className="h-px w-20 bg-orangeMain/40" />

                    <Brain
                        size={28}
                        className="text-orangeMain"
                    />

                    <span className="h-px w-20 bg-orangeMain/40" />
                </div>

                <h2 className="text-3xl font-bold text-blueMain">
                    Aprender do seu jeito. Evoluir sempre.
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-blueMain/90">
                    Adapte questões, crie salas de estudo e aprenda
                    de forma personalizada e colaborativa.
                </p>
            </section>

            {/* CARDS */}
            <section className="relative z-10 mx-auto max-w-4xl px-6 pb-16">

                <div className="rounded-3xl bg-white/80 p-4 shadow-xl backdrop-blur-sm">

                    <div className="grid grid-cols-2 gap-5">

                        <ActionCard
                            href="/pages/Adaptar"
                            title="Adaptar Questões"
                            description="Personalize questões de acordo com o seu objetivo."
                            icon={<Brain size={30} />}
                            variant="orange"
                            fullWidth
                        />

                        <ActionCard
                            href="/pages/Room"
                            title="Entrar na Sala"
                            description="Entre em uma sala com código."
                            icon={<LogIn size={30} />}
                            variant="blue"
                            onClick={() => setModal("entrar")}
                        />

                        <ActionCard
                            href="/pages/Room"
                            title="Criar Sala"
                            description="Crie sua sala e convide amigos."
                            icon={<Plus size={30} />}
                            variant="green"
                            onClick={() => setModal("criar")}
                        />

                    </div>

                </div>
            </section>

            <ModalActions
                modal={modal}
                setModal={setModal}
            />

        </main>
    );
}