/**
 * Returns the singular or plural version of a string based on the count.
 * @example
 * ```typescript
 * plural(count, "{{count}} item", "{{count}} items")
 * ```
 */
export const plural = (count: number, singular: string, pluralString: string): string => {
  const c = (count as number | undefined) ?? 0;
  if (c === 1) {
    return singular.replace("{{count}}", c.toString());
  }
  return pluralString.replace("{{count}}", c.toString());
};
