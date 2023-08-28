const findNearestFloorIndex = (
  floor: number,
  array: { aim: number[]; index: number; start: number }[]
) => {
  let nearestEmptyAimIndex = -1;
  let nearestNonEmptyAimIndex = -1;
  let nearestEmptyAimDifference = Infinity;
  let nearestNonEmptyAimDifference = Infinity;

  for (let i = 0; i < array.length; i++) {
    if (array[i].start === floor) {
      return array[i].index;
    }

    if (array[i].aim.length === 0) {
      const difference = Math.abs(array[i].start - floor);

      if (difference < nearestEmptyAimDifference) {
        nearestEmptyAimIndex = i;
        nearestEmptyAimDifference = difference;
      }
    } else {
      const lastAim = array[i].aim[array[i].aim.length - 1];
      const difference = Math.abs(lastAim - floor);

      if (difference < nearestNonEmptyAimDifference) {
        nearestNonEmptyAimIndex = i;
        nearestNonEmptyAimDifference = difference;
      }
    }
  }

  if (nearestEmptyAimIndex !== -1) {
    return nearestEmptyAimIndex;
  }

  return nearestNonEmptyAimIndex;
};

export default findNearestFloorIndex;
