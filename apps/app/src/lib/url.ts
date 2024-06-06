export const isValidProjectOrigin = (string: string): boolean => fixProjectOrigin(string) !== null;

export const fixProjectOrigin = (url: string): string | null => {
  if (url === "null") return url;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
};
