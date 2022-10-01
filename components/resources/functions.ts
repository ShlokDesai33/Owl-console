export function formatParam(param: string) {
  const arr = param.split('_');
  // capitalize first letter of each word
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  // join words with spaces
  return arr.join(' ');
}

export function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}