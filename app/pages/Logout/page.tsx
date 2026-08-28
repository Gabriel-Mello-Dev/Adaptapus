"use client";

import { createClient } from "@/app/libs/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    redirect("/pages/SignUp");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
      >
        Sair
      </button>
    </main>
  );
}