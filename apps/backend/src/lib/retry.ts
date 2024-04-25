export const retry = <T>(fn: () => Promise<T>, retries = 3): Promise<T> =>
  fn().catch((error) => {
    if (retries > 0) {
      return retry(fn, retries - 1);
    }
    throw error;
  });
