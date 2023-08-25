import { render, fireEvent } from "@testing-library/react";
import ElevatorButton from "./ElevatorButton";
import "@testing-library/jest-dom/extend-expect";

test("renders ElevatorButton with default state", () => {
    const { getByRole } = render(<ElevatorButton />);
    const button = getByRole("button");
    
    expect(button).toHaveStyle("border: 2px outset buttonface");
    expect(button).toHaveAttribute("aria-pressed", "false");
});

test("renders ElevatorButton with pressed state", () => {
    const { getByRole } = render(<ElevatorButton pressed />);
    const button = getByRole("button");
    
    expect(button).toHaveStyle("border: 2px outset buttonface");
    expect(button).toHaveAttribute("aria-pressed", "true");
});

test("calls onClick when ElevatorButton is clicked", () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(<ElevatorButton onClick={onClickMock} />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
});
