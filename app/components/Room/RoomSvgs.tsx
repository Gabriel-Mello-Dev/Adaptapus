export default function RoomSvgs() {
    return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

    {/* ================================================= */}
    {/* ONDAS DECORATIVAS - CANTO SUPERIOR ESQUERDO */}
    {/* ================================================= */}

    <svg
        className="absolute -left-8 top-0 h-40 w-40 text-orangeSecond/25 sm:-left-4"
        viewBox="0 0 180 180"
        fill="none"
    >
        <path
        d="M0 38C28 22 48 28 67 12C84 -2 105 0 121 10"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        />

        <path
        d="M0 72C26 53 48 58 69 42C90 26 112 29 136 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        />

        <path
        d="M0 104C24 87 44 91 61 80C80 67 100 67 117 75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        />
    </svg>


    {/* ================================================= */}
    {/* BOLHAS - ESQUERDA */}
    {/* ================================================= */}

    <svg
        className="absolute left-[1%] top-[18%] h-44 w-44 text-orangeSecond/35 sm:left-[4%]"
        viewBox="0 0 180 180"
        fill="none"
    >
        <circle
        cx="28"
        cy="38"
        r="6"
        fill="currentColor"
        />

        <circle
        cx="78"
        cy="56"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="40"
        cy="112"
        r="14"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="118"
        cy="125"
        r="5"
        fill="currentColor"
        />

        <circle
        cx="142"
        cy="72"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="96"
        cy="18"
        r="3"
        fill="currentColor"
        />
    </svg>


    {/* ================================================= */}
    {/* BOLHAS - DIREITA */}
    {/* ================================================= */}

    <svg
        className="absolute right-[1%] top-[22%] h-48 w-48 text-greenMain/30 sm:right-[4%]"
        viewBox="0 0 190 190"
        fill="none"
    >
        <circle
        cx="34"
        cy="34"
        r="5"
        fill="currentColor"
        />

        <circle
        cx="82"
        cy="53"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="148"
        cy="76"
        r="7"
        fill="currentColor"
        />

        <circle
        cx="106"
        cy="122"
        r="13"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="52"
        cy="145"
        r="4"
        fill="currentColor"
        />

        <circle
        cx="154"
        cy="135"
        r="3"
        fill="currentColor"
        />
    </svg>


    {/* ================================================= */}
    {/* BOLHAS MENORES - CENTRO ESQUERDA */}
    {/* ================================================= */}

    <svg
        className="absolute left-[5%] top-[48%] h-28 w-28 text-orangeMain/25 sm:left-[8%]"
        viewBox="0 0 120 120"
        fill="none"
    >
        <circle
        cx="22"
        cy="34"
        r="4"
        fill="currentColor"
        />

        <circle
        cx="57"
        cy="55"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="90"
        cy="30"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="77"
        cy="93"
        r="3"
        fill="currentColor"
        />
    </svg>


    {/* ================================================= */}
    {/* BOLHAS MENORES - CENTRO DIREITA */}
    {/* ================================================= */}

    <svg
        className="absolute right-[5%] top-[48%] h-28 w-28 text-orangeSecond/25 sm:right-[8%]"
        viewBox="0 0 120 120"
        fill="none"
    >
        <circle
        cx="25"
        cy="38"
        r="4"
        fill="currentColor"
        />

        <circle
        cx="61"
        cy="56"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="95"
        cy="31"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="80"
        cy="92"
        r="3"
        fill="currentColor"
        />
    </svg>


    {/* ================================================= */}
    {/* CORAIS / ALGAS - ESQUERDA */}
    {/* ================================================= */}

    <svg
        className="absolute -bottom-10 -left-8 h-80 w-80 text-orangeSecond/75 sm:-left-2"
        viewBox="0 0 320 320"
        fill="none"
    >

        {/* Coral principal */}
        <path
        d="
            M18 320
            C18 286 26 258 41 235
            C56 212 52 190 32 168

            M41 235
            C65 226 84 205 91 179

            M44 219
            C26 211 16 197 12 178

            M56 198
            C79 185 94 161 100 136

            M36 248
            C19 243 8 231 2 215
        "
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        />

        {/* Coral secundário */}
        <path
        d="
            M71 320
            C71 289 81 263 96 239
            C112 214 120 187 120 160

            M96 239
            C120 229 139 208 148 182

            M105 215
            C87 202 78 184 78 163
        "
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        />

        {/* Alga azul */}
        <path
        d="
            M125 320
            C111 286 116 251 135 223
            C153 196 149 166 138 140
            C129 118 135 92 152 71
            C160 60 164 46 160 32
        "
        stroke="#27314b"
        strokeWidth="12"
        strokeLinecap="round"
        />

        <path
        d="
            M155 320
            C143 286 148 257 164 232
            C181 205 183 179 176 153
            C170 131 175 106 191 86
            C199 77 202 64 198 50
        "
        stroke="#27314b"
        strokeWidth="8"
        strokeLinecap="round"
        />

        {/* Alga clara */}
        <path
        d="
            M182 320
            C174 289 179 265 193 243
            C207 221 214 198 211 174
            C207 150 213 129 228 109
        "
        stroke="#3c9d81"
        strokeWidth="7"
        strokeLinecap="round"
        />

        {/* Base */}
        <path
        d="
            M0 301
            C34 283 63 284 94 299
            C123 313 149 313 177 298
            C205 283 231 287 258 302
            C281 315 300 315 320 304
            L320 320
            L0 320
            Z
        "
        fill="#27314b"
        opacity="0.9"
        />

        <path
        d="
            M0 306
            C29 295 52 297 76 308
            C99 319 122 318 146 308
            C170 298 193 299 217 309
            C242 319 270 318 320 304
            L320 320
            L0 320
            Z
        "
        fill="#3c9d81"
        opacity="0.45"
        />
    </svg>


    {/* ================================================= */}
    {/* CORAIS / ALGAS - DIREITA */}
    {/* ================================================= */}

    <svg
        className="absolute -bottom-10 -right-8 h-80 w-80 scale-x-[-1] text-orangeSecond/75 sm:-right-2"
        viewBox="0 0 320 320"
        fill="none"
    >

        {/* Coral principal */}
        <path
        d="
            M18 320
            C18 286 26 258 41 235
            C56 212 52 190 32 168

            M41 235
            C65 226 84 205 91 179

            M44 219
            C26 211 16 197 12 178

            M56 198
            C79 185 94 161 100 136

            M36 248
            C19 243 8 231 2 215
        "
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        />

        {/* Coral secundário */}
        <path
        d="
            M71 320
            C71 289 81 263 96 239
            C112 214 120 187 120 160

            M96 239
            C120 229 139 208 148 182

            M105 215
            C87 202 78 184 78 163
        "
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        />

        {/* Alga azul */}
        <path
        d="
            M125 320
            C111 286 116 251 135 223
            C153 196 149 166 138 140
            C129 118 135 92 152 71
            C160 60 164 46 160 32
        "
        stroke="#27314b"
        strokeWidth="12"
        strokeLinecap="round"
        />

        <path
        d="
            M155 320
            C143 286 148 257 164 232
            C181 205 183 179 176 153
            C170 131 175 106 191 86
            C199 77 202 64 198 50
        "
        stroke="#27314b"
        strokeWidth="8"
        strokeLinecap="round"
        />

        {/* Alga clara */}
        <path
        d="
            M182 320
            C174 289 179 265 193 243
            C207 221 214 198 211 174
            C207 150 213 129 228 109
        "
        stroke="#3c9d81"
        strokeWidth="7"
        strokeLinecap="round"
        />

        {/* Base */}
        <path
        d="
            M0 301
            C34 283 63 284 94 299
            C123 313 149 313 177 298
            C205 283 231 287 258 302
            C281 315 300 315 320 304
            L320 320
            L0 320
            Z
        "
        fill="#27314b"
        opacity="0.9"
        />

        <path
        d="
            M0 306
            C29 295 52 297 76 308
            C99 319 122 318 146 308
            C170 298 193 299 217 309
            C242 319 270 318 320 304
            L320 320
            L0 320
            Z
        "
        fill="#3c9d81"
        opacity="0.45"
        />
    </svg>


    {/* ================================================= */}
    {/* BOLHAS PRÓXIMAS AO FUNDO */}
    {/* ================================================= */}

    <svg
        className="absolute bottom-[15%] left-[16%] h-24 w-24 text-orangeSecond/30 sm:left-[20%]"
        viewBox="0 0 100 100"
        fill="none"
    >
        <circle
        cx="23"
        cy="68"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="53"
        cy="44"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="76"
        cy="20"
        r="4"
        fill="currentColor"
        />
    </svg>


    <svg
        className="absolute bottom-[17%] right-[16%] h-24 w-24 text-greenMain/30 sm:right-[20%]"
        viewBox="0 0 100 100"
        fill="none"
    >
        <circle
        cx="25"
        cy="67"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="56"
        cy="42"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        />

        <circle
        cx="77"
        cy="19"
        r="4"
        fill="currentColor"
        />
    </svg>

    </div>
    )
}