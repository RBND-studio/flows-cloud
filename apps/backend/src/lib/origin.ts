export const isLocalhost = (origin: string): boolean => {
  const url = new URL(origin);
  const originWithoutPort = `${url.protocol}//${url.hostname}`;

  return ["http://localhost", "https://localhost", "http://127.0.0.1", "https://127.0.0.1"].some(
    (o) => o === originWithoutPort,
  );
};
