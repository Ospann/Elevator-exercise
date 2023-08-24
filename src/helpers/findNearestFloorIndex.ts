/**
 * Function to Find Near Elevator from array
 * @param value 
 * @param array 
 * @returns index
 */
const findNearestFloorIndex = (value: number, array: number[]) => {
  let nearestIndex = 0;
  let nearestDifference = Math.abs(array[0] - value);

  for (let i = 1; i < array.length; i++) {
    const difference = Math.abs(array[i] - value);
    if (difference < nearestDifference) {
      nearestIndex = i;
      nearestDifference = difference;
    }
  }

  return nearestIndex;
};

export default findNearestFloorIndex;
