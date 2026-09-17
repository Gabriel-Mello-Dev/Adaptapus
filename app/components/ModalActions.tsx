import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { JoinRoomPage, CreateRoom } from "./index";

export default function ModalActions({ modal, setModal }: { modal: "entrar" | "criar" | null; setModal: (modal: "entrar" | "criar" | null) => void }) {
    
    return (
        <Dialog
                        open={modal !== null}
                        onOpenChange={(open) => {
                            if (!open) setModal(null);
                        }}
                    >
                        <DialogContent className="bg-blueMain text-white">
                            <DialogHeader className="">
                                <DialogTitle>
                                    {modal === "entrar"
                                        ? "Entrar na Sala"
                                        : "Criar Sala"}
                                </DialogTitle>

                                <DialogDescription>
                                    {modal === "entrar"
                                        ? "Digite o código da sala para entrar."
                                        : "Configure sua nova sala de estudo."}
                                </DialogDescription>
                            </DialogHeader>
                            
                            {modal === "entrar"
                            ? <JoinRoomPage/>
                            : <CreateRoom/>
                            }

                        </DialogContent>
                    </Dialog>
    )
}