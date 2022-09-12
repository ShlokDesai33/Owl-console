export function getArray(input: string | string[]) {
  if (typeof input === 'string') {
    return [input];
  }
  return input;
}