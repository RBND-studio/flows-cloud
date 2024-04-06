import { type AuthSession, mapSupabaseSession } from "auth/map-supabase-session";
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

type AuthContextType = {
  auth: AuthSession | null;
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
  const [auth, setAuth] = useState<AuthSession | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then((res) => {
      setAuth(mapSupabaseSession(res.data.session));
    });

    supabase.auth.onAuthStateChange((_, session) => {
      setAuth(mapSupabaseSession(session));
    });
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
