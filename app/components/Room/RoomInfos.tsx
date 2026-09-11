interface Materia {
  nome: string;
  arquivo: string;
}

interface RoomInfosProps {
  userName: string;
  isAdmin: boolean;
  questoesLength: number;
  materias: Materia[];
  materiaSelecionada: string;
}

export default function RoomInfos({
  userName,
  isAdmin,
  questoesLength,
  materias,
  materiaSelecionada,
}: RoomInfosProps) {
  const materiaAtual =
    materias.find(
      (materia) => materia.arquivo === materiaSelecionada,
    )?.nome || "matéria";

  return (
    <div className="w-full max-w-3xl mb-6">
      <div className="bg-[#1e1038] border border-[#332156] rounded-2xl p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Sala de Chat
            </h1>

            <p className="text-purple-300 mt-1 text-sm">
              Converse em tempo real com seus amigos
            </p>
          </div>

          {/* USER */}
          <div className="bg-[#1a0e30] border border-[#332156] rounded-xl px-4 py-3">
            <p className="text-sm text-purple-300">
              Você entrou como
            </p>

            <h2 className="text-xl font-semibold">
              {userName}
            </h2>
          </div>

          {/* ADMIN */}
          {isAdmin && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 rounded-xl p-3 text-sm">
              Você é o administrador da sala
            </div>
          )}

          {/* QUANTIDADE */}
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 rounded-xl p-3 text-sm">
            {questoesLength} questões de {materiaAtual} carregadas
          </div>
        </div>
      </div>
    </div>
  );
}