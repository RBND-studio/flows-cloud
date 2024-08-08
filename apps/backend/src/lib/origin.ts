import { sanitize } from "./sanitize";

export const isLocalhost = (origin: string): boolean => {
  if (origin === "null") return false;

  try {
    const url = new URL(origin);
    const originWithoutPort = `${url.protocol}//${url.hostname}`;

    return ["http://localhost", "https://localhost", "http://127.0.0.1", "https://127.0.0.1"].some(
      (o) => o === originWithoutPort,
    );
  } catch (e) {
    // eslint-disable-next-line no-console -- helpful for debugging
    console.error("Error parsing origin", sanitize(origin), e);
    return false;
  }
};
