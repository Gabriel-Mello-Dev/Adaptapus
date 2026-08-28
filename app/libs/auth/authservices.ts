import {redirect} from "next/navigation";
import {createClient} from "@/app/libs/supabase/server";

export const checkLoggedUser = async() => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user) {
        redirect("/login");
    }
}