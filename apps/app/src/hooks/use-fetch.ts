import { useAuth } from "auth/client";
import { useCallback, useMemo } from "react";
import useSWR, { mutate as swrMutate } from "swr";

import { type Api, api } from "../lib/api";

const DEFAULT_ARGS = [] as unknown;

export const useFetch = <
  Key extends keyof Api,
  Args extends Parameters<Api[Key]>,
  Return extends Awaited<ReturnType<ReturnType<Api[Key]>>>,
>(
  key: Key | null,
  args: Args | null = DEFAULT_ARGS as Args,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- not needed
) => {
  const { auth } = useAuth();
  const token = auth?.token;

  const _key = useMemo((): null | [Key, ...Args] => {
    if (!key) return null;
    if (!args) return null;
    if (!token) return null;
    return [key, ...args];
  }, [args, key, token]);

  const fetcher = useCallback(
    ([k, ...a]: [Key, ...Args]): Return => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- the typing is correct
      // @ts-expect-error
      return api[k](...a)({ token });
    },
    [token],
  );

  return useSWR<Return>(_key, { fetcher });
};

export const mutate = <Key extends keyof Api, Args extends Parameters<Api[Key]>>(
  key: Key,
  args: Args = DEFAULT_ARGS as Args,
): Promise<void> => swrMutate([key, ...args]);
