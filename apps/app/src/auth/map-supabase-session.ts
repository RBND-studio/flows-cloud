import { type Session } from "@supabase/supabase-js";

export type AuthSession = {
  session: Omit<Session, "user">;
  user: Session["user"] & { full_name: string };
};

export const mapSupabaseSession = (session?: Session | null): AuthSession | null => {
  if (!session) return null;

  return {
    session: {
      provider_token: session.provider_token,
      provider_refresh_token: session.provider_refresh_token,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
      expires_at: session.expires_at,
      token_type: session.token_type,
    },
    user: {
      app_metadata: session.user.app_metadata,
      aud: session.user.aud,
      confirmed_at: session.user.confirmed_at,
      created_at: session.user.created_at,
      email: session.user.email,
      id: session.user.id,
      role: session.user.role,
      updated_at: session.user.updated_at,
      user_metadata: session.user.user_metadata,
      full_name: session.user.user_metadata.full_name,
    },
  };
};
