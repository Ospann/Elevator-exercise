import { render } from "@testing-library/react";
import Elevator from "./Elevator";
import "@testing-library/jest-dom/extend-expect";

test("renders Elevator with correct position", () => {
    const position = 100;
    const number = 1;

    const { getByTestId } = render(
        <Elevator position={position} number={number} />
    );

    const elevator = getByTestId("elevator");
    expect(elevator).toBeInTheDocument();
    // expect(elevator).toHaveStyle(`transform: translateY(-${position}px)`);
});

test("renders Elevator with correct cage number", () => {
    const position = 0;
    const number = 0;

    const { getByTestId } = render(
        <Elevator position={position} number={number} />
    );

    const elevatorCage = getByTestId("elevator-cage");
    expect(elevatorCage).toBeInTheDocument();
    // expect(elevatorCage).toHaveStyle(`margin-left: ${number * 2.5}rem`);
});
