import findNearestFloorIndex from './findNearestFloorIndex';

describe('findNearestFloorIndex function', () => {
  it('should return the correct index when there is a non-busy elevator with the same start floor', () => {
    const array = [
      { aim: 5, index: 0, start: 5 },
      { aim: 7, index: 1, start: 3 },
      { aim: 3, index: 2, start: 2 },
    ];
    const floor = 5;

    const result = findNearestFloorIndex(floor, array);

    expect(result).toBe(0);
  });

  it('should return the correct index when there are non-busy elevators', () => {
    const array = [
      { aim: 5, index: 0, start: 3 },
      { aim: 7, index: 1, start: 7 },
      { aim: 3, index: 2, start: 7 },
    ];
    const floor = 6;

    const result = findNearestFloorIndex(floor, array);

    expect(result).toBe(1);
  });

  it('should return -1 when all elevators are busy', () => {
    const array = [
      { aim: 5, index: 0, start: 3 },
      { aim: 7, index: 1, start: 5 },
      { aim: 3, index: 2, start: 2 },
    ];
    const floor = 6;

    const result = findNearestFloorIndex(floor, array);

    expect(result).toBe(-1);
  });
});
