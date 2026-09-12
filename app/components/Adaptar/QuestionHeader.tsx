import Image from "next/image";

export default function QuestionHeader() {
  return (
    <header className="w-full flex justify-center mt-10 px-4">
      <div
        className="
          w-full
          max-w-2xl
          backdrop-blur-md
          bg-blueMain/90
          border
          border-blueSecond
          rounded-2xl
          p-6
          text-center
          shadow-lg
        "
      >
        {/* LOGO */}
        <Image
          src="/imgs/logoAdaptapus.png"
          alt="Logo Adaptapus"
          className="
            w-24
            mx-auto
            mb-4
            transition-transform
            duration-300
            hover:scale-105
            hover:translate-x-1
          "
          height={96}
          width={96}
        />

        {/* TÍTULO */}
        <h1 className="text-4xl font-bold text-orangeMain">
          Adaptapus
        </h1>

        {/* SUBTÍTULO */}
        <p className="text-whiteMain/70 mt-2 text-sm md:text-base">
          Adaptador inteligente de questões
        </p>
      </div>
    </header>
  );
}
