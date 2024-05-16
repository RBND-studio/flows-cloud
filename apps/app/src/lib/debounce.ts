// eslint-disable-next-line @typescript-eslint/no-explicit-any -- useful for generic type
export const debounce = <T extends (...args: any) => any>(
  func: T,
  delay: number,
  { leading }: { leading?: boolean } = {},
): ((...args: Parameters<T>) => void) => {
  let timerId: number;

  return (...args: Parameters<T>) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
};
