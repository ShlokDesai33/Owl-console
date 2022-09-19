export function getArray(input: string | string[]) {
  if (!input) return [];
  else if (typeof input === 'string') {
    return [input];
  }
  else return input;
}