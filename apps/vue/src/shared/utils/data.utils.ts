export const quickSort = <T>(array: Array<T>, predicate: (a: T, b: T) => boolean): Array<T> => {
  if (array.length <= 1) {
    return array;
  }

  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];

  const less = [];
  const great = [];

  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) {
      continue;
    }

    if (predicate(array[i], pivot)) {
      less.push(array[i]);
    } else {
      great.push(array[i]);
    }
  }

  return [...quickSort<T>(less, predicate), pivot, ...quickSort<T>(great, predicate)];
};
