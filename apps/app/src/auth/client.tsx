import {
  type AuthSession,
  mapSupabaseSession,
  mapSupabaseUser,
  type UserData,
} from "auth/map-supabase-session";
import { signOut } from "auth/server-actions";
import { posthog } from "posthog-js";
import type { FC, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { createClient } from "supabase/client";

type AuthData = { session: AuthSession; user: UserData };

type AuthContextType = {
  auth: AuthData | null;
  logout: () => void;
  processingLogout: boolean;
};
const AuthContext = createContext<AuthContextType>({
  auth: null,
  logout: () => null,
  processingLogout: false,
});

type Props = {
  children?: ReactNode;
};
export const AuthProvider: FC<Props> = ({ children }) => {
  const supabase = createClient();
  const [auth, setAuth] = useState<AuthData | null>(null);

  useEffect(() => {
    void Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]).then(([s, u]) => {
      if (!s.data.session || !u.data.user) return;
      setAuth({
        session: mapSupabaseSession(s.data.session),
        user: mapSupabaseUser(u.data.user),
      });
    });

    // middleware.ts refreshes the access_token in cookies when server request is made, but we still need to refresh the access_token in browser memory
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) return setAuth(null);
      setAuth({
        session: mapSupabaseSession(session),
        user: mapSupabaseUser(session.user),
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const [processingLogout, startTransition] = useTransition();
  const logout = useCallback(
    (): void =>
      startTransition(() => {
        void signOut().then(() => setAuth(null));
      }),
    [],
  );

  useEffect(() => {
    if (!auth) return;
    posthog.identify(auth.user.email, { email: auth.user.email });
  }, [auth]);

  const value = useMemo(
    (): AuthContextType => ({ auth, logout, processingLogout }),
    [auth, logout, processingLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
