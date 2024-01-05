import { getAuth } from "auth/server";
import { redirect, RedirectType } from "next/navigation";
import { routes } from "routes";

import type { FetcherContext } from "./api/types";

export const load = async <T>(fn: (ctx: FetcherContext) => Promise<T>): Promise<T> => {
  const auth = await getAuth();
  if (!auth) return redirect(routes.login(), RedirectType.replace);
  return fn({ token: auth.access_token });
};
