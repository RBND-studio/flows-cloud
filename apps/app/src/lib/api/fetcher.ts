import { API_URL } from "../constants";
import type { FetcherContext } from "./types";

export class ApiError extends Error {
  res?: Response;
  constructor(message: string, response?: Response) {
    super(message);
    this.res = response;
  }
}

export const fetcher =
  <T>(path: string, init?: Omit<RequestInit, "body"> & { body?: unknown }) =>
  (context: FetcherContext): Promise<T> => {
    const headers = {
      Authorization: context.token ? `Bearer ${context.token}` : "",
      ...init?.headers,
    };
    if (init?.body) headers["Content-Type"] = "application/json";

    return fetch(API_URL + path, {
      cache: "no-store",
      ...init,
      body: init?.body ? JSON.stringify(init.body) : undefined,
      headers,
    }).then(async (res) => {
      const text = await res.text();
      let resBody;
      if (res.headers.get("content-type")?.includes("application/json"))
        resBody = text ? JSON.parse(text) : undefined;

      if (!res.ok)
        throw new ApiError(
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intentional here
          (resBody as undefined | { message: string })?.message || res.statusText,
          res,
        );
      return (resBody ?? text) as T;
    });
  };
