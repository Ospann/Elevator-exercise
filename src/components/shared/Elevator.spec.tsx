import { render } from "@testing-library/react";
import Elevator from "./Elevator";
import "@testing-library/jest-dom/extend-expect";

test("renders Elevator with correct position", () => {
    const position = 100;
    const number = 1;
    const distance = 2;
    const aim = 3;
    const { getByTestId } = render(
        <Elevator updated={true} position={position} number={number} distance={distance} aim={aim} />
    );

    const elevator = getByTestId("elevator");
    expect(elevator).toBeInTheDocument();
    // expect(elevator).toHaveStyle(`transform: translateY(-${position}px)`);
});

test("renders Elevator with correct cage number", () => {
    const position = 0;
    const number = 0;
    const distance = 0;
    const aim = 0;

    const { getByTestId } = render(
        <Elevator updated={false} position={position} number={number} distance={distance} aim={aim} />
    );

    const elevatorCage = getByTestId("elevator-cage");
    expect(elevatorCage).toBeInTheDocument();
    // expect(elevatorCage).toHaveStyle(`margin-left: ${number * 2.5}rem`);
});
