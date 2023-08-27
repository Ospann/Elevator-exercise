import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Elevator from './Elevator';

describe('Elevator component', () => {
  const mockSetElevatorInfo = jest.fn();
  const mockCurrentFloors = [
    { aim: 5, index: 0, start: 3 },
    { aim: 7, index: 1, start: 5 },
    { aim: 3, index: 2, start: 7 },
  ];

  it('should render with the correct initial floor', () => {
    render(
      <Elevator
        position={0}
        number={0}
        distance={2}
        aim={5}
        currentFloors={mockCurrentFloors}
        setElevatorInfo={mockSetElevatorInfo}
      />
    );

    const elevatorCage = screen.getByTestId('elevator-cage');
    expect(elevatorCage.textContent).toBe('1');
  });

  it('should update the floor when the aim floor changes', () => {
    render(
      <Elevator
        position={0}
        number={0}
        distance={2}
        aim={7}
        currentFloors={mockCurrentFloors}
        setElevatorInfo={mockSetElevatorInfo}
      />
    );

    const elevatorCage = screen.getByTestId('elevator-cage');
    expect(elevatorCage.textContent).toBe('1');

    userEvent.click(screen.getByText('7'));
    expect(elevatorCage.textContent).toBe('2');
  });

  it('should stop updating the floor when the aim floor is reached', () => {
    render(
      <Elevator
        position={0}
        number={0}
        distance={2}
        aim={3}
        currentFloors={mockCurrentFloors}
        setElevatorInfo={mockSetElevatorInfo}
      />
    );

    const elevatorCage = screen.getByTestId('elevator-cage');
    expect(elevatorCage.textContent).toBe('1');

    jest.advanceTimersByTime(3000); // Advance time by 3 seconds
    expect(elevatorCage.textContent).toBe('3');
  });
});
