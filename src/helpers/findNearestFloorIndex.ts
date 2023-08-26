const findNearestFloorIndex = (
  floor: number,
  array: {aim: number, index: number,start:number }[],
) => {
  let nearestIndex = -1;
  let nearestDifference = Infinity;

  for (let i = array.length -1 ; i >= 0; i--) {
    if (array[i].start === floor) return array[i].index;
    if (array[i].start === array[i].aim) {
      const difference = Math.abs(array[i].start - floor);

      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }

  return nearestIndex;                   
};

export default findNearestFloorIndex;
