export function formatNumberWithThousandSeparator(value: number, round?: number): string {
  const roundedValue = round !== undefined ? value.toFixed(round) : value.toString();
  return roundedValue.replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

export function formatNumberToK(value: number): string {
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(1);
    return formattedValue.endsWith(".0") ? `${formattedValue.slice(0, -2)}k` : `${formattedValue}k`;
  }
  return value.toString();
}
