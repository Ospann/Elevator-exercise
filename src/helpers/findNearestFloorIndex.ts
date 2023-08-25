const findNearestFloorIndex = (
  value: number,
  array: number[],
  busies: boolean[]
) => {
  let nearestIndex = -1;
  let nearestDifference = Infinity;

  if (array.length < 2) return 0;

  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === value) return i;

    if (!busies[i]) {
      const difference = Math.abs(array[i] - value);

      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }

  for (let i = array.length - 1; i > nearestIndex; i--) {
    if (!busies[i]) {
      const difference = Math.abs(array[i] - value);
      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }
  return nearestIndex;
};

export default findNearestFloorIndex;
