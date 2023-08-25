import { render, screen } from "@testing-library/react";
import Building from "./Building";
import "@testing-library/jest-dom/extend-expect";

test("renders correct number of floors and elevators", () => {
    const currentFloors = [0, 1, 2];
    const currentFloor = 1;
    const floors = 5;
    const elevators = 3;
    const busies = [true, false, false]

    render(
        <Building
            busies={busies}
            currentFloors={currentFloors}
            currentFloor={currentFloor}
            floors={floors}
            elevators={elevators}
        />
    );

    const building = screen.getAllByTestId("building");

    expect(building).toHaveLength(1);
});
