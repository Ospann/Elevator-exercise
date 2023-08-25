import { render } from "@testing-library/react";
import BuildingFloor from "./BuildingFloor";
import "@testing-library/jest-dom/extend-expect";

test("renders BuildingFloor with correct height", () => {
    const height = 100;

    const { getByTestId } = render(
        <BuildingFloor height={height} />
    );

    const buildingFloor = getByTestId("building-floor");
    expect(buildingFloor).toBeInTheDocument();
});

test("renders BuildingFloor with ElevatorShaft", () => {
    const height = 100;

    const { getByTestId } = render(
        <BuildingFloor height={height} />
    );

    const elevatorShaft = getByTestId("elevator-shaft");
    expect(elevatorShaft).toBeInTheDocument();
});
