import Image from "next/image";

export function QuestionHeader() {
  return (
    <header className="w-full flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center shadow-lg">
        
        {/* Logo */}
        <Image
          src="/imgs/logoAdaptapus.png"
          alt="Logo Adaptil"
          className="w-24 mx-auto mb-4 transition-transform duration-300 hover:scale-105 hover:translate-x-1"
          height={96}
          width={96}
        />

        {/* Título */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Adaptil
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Adaptador inteligente de questões
        </p>

      </div>
    </header>
  );
}