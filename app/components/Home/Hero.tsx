import { ActionCard } from "./index";

import {
    Brain,
    LogIn,
    Plus,
} from "lucide-react";

export default function Hero() {

    return ( 
        <main className="relative flex flex-1 flex-col overflow-hidden">

                {/* Hero */}
                <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-6 pt-10 text-center">

                    <h1 className="text-6xl font-bold text-greenMain">
                        Adaptil
                    </h1>

                    <div className="my-2 flex items-center gap-4">
                        <span className="h-px w-20 bg-greenMain/40" />
                        <Brain
                            size={28}
                            className="text-greenMain"
                        />
                        <span className="h-px w-20 bg-greenMain/40" />
                    </div>

                    <h2 className="text-3xl font-bold text-purpleThird">
                        Aprender do seu jeito. Evoluir sempre.
                    </h2>

                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-purpleThird/90">
                        Adapte questões, crie salas de estudo e aprenda
                        de forma personalizada e colaborativa.
                    </p>

                </section>


                {/* Cards */}
                <section className="mx-auto max-w-4xl px-6 pb-16">

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
                                variant="green"
                            />

                            <ActionCard
                                href="/pages/Room"
                                title="Criar Sala"
                                description="Crie sua sala e convide amigos."
                                icon={<Plus size={30} />}
                                variant="purple"
                            />

                        </div>

                    </div>

                </section>

            </main>
    )
}