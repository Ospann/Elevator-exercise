import findNearestFloorIndex from './findNearestFloorIndex';

describe('findNearestFloorIndex', () => {
  it('should return the correct index when value is in the array', () => {
    const value = 5;
    const array = [2, 4, 5, 8, 10];
    const result = findNearestFloorIndex(value, array);
    expect(result).toBe(2); 
  });

  it('should return the index of the nearest value when value is not in the array', () => {
    const value = 6;
    const array = [2, 4, 8, 10];
    const result = findNearestFloorIndex(value, array);
    expect(result).toBe(1); 
  });

  it('should return the index of the nearest value', () => {
    const value = 5;
    const array = [1, 1, 9, 4];
    const result = findNearestFloorIndex(value, array);
    expect(result).toBe(3); 
  });

  it('should return the index of the nearest value', () => {
    const value = 1;
    const array = [5, 1, 9, 4];
    const result = findNearestFloorIndex(value, array);
    expect(result).toBe(1); 
  });
});
