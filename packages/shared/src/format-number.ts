export const formatNumberWithThousandSeparator = (value: number, round?: number): string =>
  value.toLocaleString("en-US", { maximumFractionDigits: round, minimumFractionDigits: round });

export function formatNumberToK(value: number): string {
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(1);
    return formattedValue.endsWith(".0") ? `${formattedValue.slice(0, -2)}k` : `${formattedValue}k`;
  }
  return value.toString();
}
