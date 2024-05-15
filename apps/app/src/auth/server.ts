import { mapSupabaseUser, type UserData } from "auth/map-supabase-session";
import { cookies } from "next/headers";
import { createClient } from "supabase/server";

export const getAuth = async (): Promise<{ access_token: string } | null> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();
  if (!session.data.session) return null;
  return { access_token: session.data.session.access_token };
};

export const getUser = async (): Promise<UserData | null> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  if (!user.data.user) return null;
  return mapSupabaseUser(user.data.user);
};
