import type { FetcherContext } from "lib/api/types";
import { useCallback, useState } from "react";
import { createClient } from "supabase/client";
import { toast } from "ui";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- not needed
export const useSend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const send = useCallback(
    async <T>(
      fn: (ctx: FetcherContext) => Promise<T>,
      options: { errorMessage: string | null },
    ): Promise<{ data?: T; error?: Error }> => {
      const session = await createClient().auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) {
        const err = new Error("Not authenticated");
        setError(err);
        return Promise.resolve({ error: err });
      }

      setLoading(true);
      setError(undefined);
      return fn({ token })
        .then((data) => ({ data }))
        .catch((e: unknown) => {
          const err = e as Error;
          setError(err);

          if (options.errorMessage) toast.error(options.errorMessage, { description: err.message });
          return { error: err };
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [],
  );

  return { send, loading, error };
};
