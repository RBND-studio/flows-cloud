import { signOut } from "auth/server-actions";
import posthog from "posthog-js";
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

type Session = { token: string; user: { email: string; id?: string } };

type AuthContextType = {
  auth: Session | null;
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
  const [auth, setAuth] = useState<Session | null>(null);

  useEffect(() => {
    const setSession = (
      session: { access_token: string; user: { email?: string; id: string } } | null,
    ): void => {
      if (!session) return setAuth(null);
      setAuth({
        token: session.access_token,
        user: {
          email: session.user.email ?? "",
          id: session.user.id,
        },
      });
    };

    void supabase.auth.getSession().then((res) => {
      setSession(res.data.session);
    });

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
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
    posthog.identify(auth.user.email);
  }, [auth]);

  const value = useMemo(
    (): AuthContextType => ({ auth, logout, processingLogout }),
    [auth, logout, processingLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
