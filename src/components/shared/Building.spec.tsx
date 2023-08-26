import { render } from '@testing-library/react';
import Building from './Building';

describe('Building Component', () => {
  const currentFloors = [
    { aim: 2, index: 0, start: 0 },
    { aim: 4, index: 1, start: 0 },
  ];
  const floors = 5;
  const elevators = 2;

  it('renders building floors and elevators', () => {
    const setElevatorInfoMock = jest.fn();
    const { getByTestId } = render(
      <Building
        currentFloors={currentFloors}
        floors={floors}
        elevators={elevators}
        setElevatorInfo={setElevatorInfoMock}
      />
    );

    const buildingElement = getByTestId('building');

    expect(buildingElement).toHaveLength(1);
  });
});
