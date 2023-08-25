const findNearestFloorIndex = (
  value: number,
  array: number[],
  busies: boolean[]
) => {
  let nearestIndex = -1;
  let nearestDifference = Infinity;

  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === value) return i;
  }

  for (let i = array.length - 1; i >= 0; i--) {
    if (!busies[i]) {
      const difference = Math.abs(array[i] - value);

      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }

  for (let i = nearestIndex - 1; i >= 0; i--) {
    if (!busies[i]) {
      const difference = Math.abs(array[i] - value);
      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }
  console.log(nearestIndex);
  return nearestIndex;
};

export default findNearestFloorIndex;
