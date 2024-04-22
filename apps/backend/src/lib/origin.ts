export const isLocalhost = (origin: string): boolean =>
  ["http://localhost", "https://localhost", "http://127.0.0.1", "https://127.0.0.1"].some((o) =>
    origin.startsWith(o),
  );
