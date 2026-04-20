export function parseNumber(str: string, defaultValue: number) {
  const num = parseFloat(str);
  return isNaN(num) ? defaultValue : num;
}
