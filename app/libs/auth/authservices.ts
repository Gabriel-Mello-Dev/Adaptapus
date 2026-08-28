import { createClient } from "@/app/libs/supabase/client";

export const checkLoggedUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

