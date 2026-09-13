/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/libs/supabase/client";
import { redirect } from "next/navigation";

type DenunciaUsuario = {
  did: string;
  uid1: string;
  uid2: string;
  resolved_by: string | null;
  comentario: string;
  created_at: string;
};

type DenunciaQuestao = {
  qid: string;
  uid: string | null;
  resolved_by: string | null;
  questao: string;
  comentario: string;
  created_at: string;
};

type Usuario = {
  uid: string;
  nome: string;
};

export default function AdminPage() {
  const supabase = createClient();

  const [admin, setAdmin] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [usuarios, setUsuarios] = useState<Record<string, string>>({});
  const [usuarioBanir, setUsuarioBanir] = useState<string | null>(null);
  const [denunciasUsuarios, setDenunciasUsuarios] = useState<DenunciaUsuario[]>(
    [],
  );

  const [denunciasQuestoes, setDenunciasQuestoes] = useState<DenunciaQuestao[]>(
    [],
  );

  const [iaMaisCitadas, setIaMaisCitadas] = useState<{
    nome: string;
    quantidade: number;
  } | null>(null);

  useEffect(() => {
    async function carregar() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCarregando(false);
        return;
      }

      const { data: usuario } = await supabase
        .from("usuarios")
        .select("admin")
        .eq("uid", user.id)
        .single();

      if (!usuario?.admin) {
          redirect("/");

        setCarregando(false);
        return;
      }

      setAdmin(true);

      const { data: denunciasUsuariosData } = await supabase
        .from("denuncias_usuarios")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: denunciasQuestoesData } = await supabase
        .from("denuncias_questoes")
        .select("*")
        .order("created_at", { ascending: false });

      const listaUsuarios = denunciasUsuariosData ?? [];
      const listaQuestoes = denunciasQuestoesData ?? [];

      setDenunciasUsuarios(listaUsuarios);
      setDenunciasQuestoes(listaQuestoes);

      const contagemIA: Record<string, number> = {};

      listaQuestoes.forEach((denuncia) => {
        const dados = separarDenunciaQuestao(denuncia.questao);

        const ia = dados.ia.trim();

        if (!ia) return;

        contagemIA[ia] = (contagemIA[ia] ?? 0) + 1;
      });

      const iaMaisCitada = Object.entries(contagemIA).sort(
        (a, b) => b[1] - a[1],
      )[0];

      if (iaMaisCitada) {
        setIaMaisCitadas({
          nome: iaMaisCitada[0],
          quantidade: iaMaisCitada[1],
        });
      }

      // Pega todos os UIDs envolvidos nas denúncias
      const uids = new Set<string>();

      listaUsuarios.forEach((denuncia) => {
        uids.add(denuncia.uid1);
        uids.add(denuncia.uid2);

        if (denuncia.resolved_by) {
          uids.add(denuncia.resolved_by);
        }
      });

      listaQuestoes.forEach((denuncia) => {
        if (denuncia.uid) {
          uids.add(denuncia.uid);
        }

        if (denuncia.resolved_by) {
          uids.add(denuncia.resolved_by);
        }
      });

      if (uids.size > 0) {
        const { data: dadosUsuarios } = await supabase
          .from("usuarios")
          .select("uid, nome")
          .in("uid", Array.from(uids));

        const mapaUsuarios: Record<string, string> = {};

        (dadosUsuarios as Usuario[] | null)?.forEach((usuario) => {
          mapaUsuarios[usuario.uid] = usuario.nome;
        });

        setUsuarios(mapaUsuarios);
      }

      setCarregando(false);
    }

    carregar();
  }, []);

  function nomeUsuario(uid: string | null) {
    if (!uid) {
      return "Não informado";
    }

    return usuarios[uid] ?? uid;
  }

  function separarComentario(comentario: string) {
    const partes = comentario.split("[");

    return {
      motivo: partes[0]?.trim() || "",
      mensagem: partes.slice(1).join("[").trim() || "",
    };
  }

  function separarDenunciaQuestao(questao: string) {
    const partes = questao
      .replace(/\r/g, "")
      .split("[")
      .map((parte) => parte.trim())
      .filter(Boolean);

    return {
      tema: partes[0] ?? "",
      questao: partes[1] ?? "",
      resposta: partes[2] ?? "",
      ia: partes[3] ?? "",
    };
  }

const banirUsuario = async () => {
  if (!usuarioBanir) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Tentando banir:", usuarioBanir);

  const { error } = await supabase
    .from("usuarios")
    .update({ active: false })
    .eq("uid", usuarioBanir);

  if (error) {
    console.error("Erro ao banir usuário:", error);
    return;
  }


  if (user){
 const { error: denunciaError } = await supabase
    .from("denuncias_usuarios")
    .update({ resolved_by: user.id })
    .eq("uid2", usuarioBanir);

  if (denunciaError) {
    console.error("Erro ao marcar denúncia:", denunciaError);
    return;
  }

  }
  

  setUsuarioBanir(null);
};

  if (carregando) {
    return (
      <main className="min-h-screen p-6">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!admin) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-2xl font-bold">Acesso negado</h1>

        <p className="mt-2 text-gray-500">
          Você não possui permissão para acessar esta página.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>

          <p className="mt-1 text-sm text-gray-500">
            Gerenciamento de denúncias.
          </p>
        </header>

        {iaMaisCitadas && (
          <section className="mb-8">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                I.A. mais citada nas denúncias
              </p>

              <div className="mt-2 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {iaMaisCitadas.nome}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {iaMaisCitadas.quantidade}{" "}
                    {iaMaisCitadas.quantidade === 1 ? "denúncia" : "denúncias"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Denúncias de usuários</h2>

          <div className="overflow-hidden rounded-lg border">
            {denunciasUsuarios.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Denunciante</th>
                      <th className="px-4 py-3">Denunciado</th>
                      <th className="px-4 py-3">Comentário</th>
                      <th className="px-4 py-3">Resolvido por</th>
                      <th className="px-4 py-3">Banir?</th>
                    </tr>
                  </thead>

                  <tbody>
                    {denunciasUsuarios.map((denuncia) => {
                      const comentario = separarComentario(denuncia.comentario);

                      return (
                        <tr key={denuncia.did} className="border-t">
                          <td className="px-4 py-3 text-sm">{denuncia.did}</td>

                          <td className="px-4 py-3 text-sm">
                            <div>
                              <p className="font-medium">
                                {nomeUsuario(denuncia.uid1)}
                              </p>

                              <p className="text-xs text-gray-500">
                                {denuncia.uid1}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <div>
                              <p className="font-medium">
                                {nomeUsuario(denuncia.uid2)}
                              </p>

                              <p className="text-xs text-gray-500">
                                {denuncia.uid2}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <p>
                              <span className="font-semibold">Motivo:</span>{" "}
                              {comentario.motivo}
                            </p>

                            <p className="mt-1">
                              <span className="font-semibold">Mensagem:</span>{" "}
                              {comentario.mensagem}
                            </p>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            {denuncia.resolved_by ? (
                              <div>
                                <p className="font-medium">
                                  {nomeUsuario(denuncia.resolved_by)}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {denuncia.resolved_by}
                                </p>
                              </div>
                            ) : (
                              "Pendente"
                            )}
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <button
                              type="button"
                              onClick={() => setUsuarioBanir(denuncia.uid2)}
                              className="rounded bg-red-600 px-3 py-2 text-white"
                            >
                              Banir
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-sm text-gray-500">
                Nenhuma denúncia encontrada.
              </p>
            )}
          </div>
        </section>

        {/* Denuncia de questoes */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Denúncias de questões</h2>

          <div className="overflow-hidden rounded-lg border">
            {denunciasQuestoes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Usuário</th>
                      <th className="border p-2 text-left">Denúncia</th>
                    </tr>
                  </thead>

                  <tbody>
                    {denunciasQuestoes.map((denuncia) => {
                      const dados = separarDenunciaQuestao(denuncia.questao);
                      return (
                        <tr key={denuncia.qid} className="border-t">
                          <td className="border p-3 align-top">
                            {denuncia.resolved_by ? "Resolvido" : "Pendente"}
                          </td>

                          <td className="border p-3 align-top">
                            <div>
                              <p className="font-medium">
                                {nomeUsuario(denuncia.uid)}
                              </p>

                              {denuncia.uid && (
                                <p className="text-xs text-gray-500">
                                  {denuncia.uid}
                                </p>
                              )}
                            </div>
                          </td>

                          <td className="border p-3 align-top">
                            <div className="space-y-4">
                              <div>
                                <p className="font-semibold">Tema</p>
                                <p className="mt-1">
                                  {dados.tema || "Não informado"}
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold">Questão</p>
                                <p className="mt-1 whitespace-pre-wrap">
                                  {dados.questao || "Não informado"}
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold">
                                  Resposta correta
                                </p>
                                <p className="mt-1">
                                  {dados.resposta || "Não informado"}
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold">I.A usada</p>
                                <p className="mt-1">
                                  {dados.ia || "Não informado"}
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold">
                                  Comentário da denúncia
                                </p>
                                <p className="mt-1 whitespace-pre-wrap">
                                  {denuncia.comentario || "Sem comentário"}
                                </p>
                              </div>
                            </div>
                          </td>

                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-sm text-gray-500">
                Nenhuma denúncia encontrada.
              </p>
            )}
          </div>
        </section>

        {usuarioBanir && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Banir usuário
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Esta ação irá banir o usuário selecionado.
                </p>
              </div>

              <div className="space-y-3 rounded-lg bg-gray-100 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Usuário
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {nomeUsuario(usuarioBanir)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    ID
                  </p>

                  <p className="mt-1 break-all text-sm text-gray-600">
                    {usuarioBanir}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-gray-700">
                Tem certeza que deseja banir este usuário?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUsuarioBanir(null)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={banirUsuario}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Confirmar banimento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
