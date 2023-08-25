import { render, fireEvent } from "@testing-library/react";
import ElevatorButtons from "./Buttons";
import "@testing-library/jest-dom/extend-expect";

test("renders correct number of buttons", () => {
    const floors = 5;
    const pressed = [false, true, false, true, false];
    const onFloorRequest = jest.fn();

    const { getAllByRole } = render(
        <ElevatorButtons
            floors={floors}
            pressed={pressed}
            onFloorRequest={onFloorRequest}
        />
    );

    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(floors);
});

test("calls onFloorRequest with correct floor when a button is clicked", () => {
    const floors = 3;
    const pressed = [false, false, false];
    const onFloorRequest = jest.fn();

    const { getByText } = render(
        <ElevatorButtons
            floors={floors}
            pressed={pressed}
            onFloorRequest={onFloorRequest}
        />
    );

    const button = getByText("1");
    fireEvent.click(button);

    expect(onFloorRequest).toHaveBeenCalledTimes(1);
    expect(onFloorRequest).toHaveBeenCalledWith(0); 
});

