export function getArrayIndex(arr, from, to) {
  return arr.findIndex(
    (value) =>
      value[0].toLowerCase() === from.toLowerCase() &&
      value[1].toLowerCase() === to.toLowerCase(),
  );
}
