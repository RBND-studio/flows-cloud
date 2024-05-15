import { type Session } from "@supabase/supabase-js";

export type UserData = Session["user"] & { full_name: string };
export type AuthSession = {
  access_token: string;
};

export const mapSupabaseSession = (session: Session): AuthSession => {
  return {
    access_token: session.access_token,
  };
};

export const mapSupabaseUser = (user: Session["user"]): UserData => {
  return {
    app_metadata: user.app_metadata,
    aud: user.aud,
    confirmed_at: user.confirmed_at,
    created_at: user.created_at,
    email: user.email,
    id: user.id,
    role: user.role,
    updated_at: user.updated_at,
    user_metadata: user.user_metadata,
    full_name: user.user_metadata.full_name,
  };
};
