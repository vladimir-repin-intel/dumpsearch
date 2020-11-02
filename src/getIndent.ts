export function getIndent(str: string): number {
  const index = str.split("").findIndex(s => s !== "\t");
  return index;
}
