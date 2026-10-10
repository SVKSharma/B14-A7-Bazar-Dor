export function formatBengaliNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat('bn-BD', options).format(value);
}
