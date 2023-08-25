const findNearestFloorIndex = (
  value: number,
  array: number[],
  busies: boolean[]
) => {
  let nearestIndex = 0;
  let nearestDifference = Math.abs(array[0] - value);
  
  for(let i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }

  for (let i = 0; i < array.length; i++) {
    if (!busies[i]) {
      const difference = Math.abs(array[i] - value);


      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }

  for (let i = nearestIndex + 1; i < array.length; i++) {
    if (!busies[i]) {
      const difference = Math.abs(array[i] - value);
      if (difference < nearestDifference) {
        nearestIndex = i;
        nearestDifference = difference;
      }
    }
  }
  console.log(nearestIndex)
  return nearestIndex;
};

export default findNearestFloorIndex;
