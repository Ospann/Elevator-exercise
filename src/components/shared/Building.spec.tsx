import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Building from "./Building";
import "@testing-library/jest-dom/extend-expect";

test("renders correct number of floors and elevators", () => {
    const currentFloors = [0, 1, 2];
    const currentFloor = 1;
    const floors = 5;
    const elevators = 3;

    render(
        <Building
            currentFloors={currentFloors}
            currentFloor={currentFloor}
            floors={floors}
            elevators={elevators}
        />
    );

    const building = screen.getAllByTestId("building");

    expect(building).toHaveLength(1);
});
