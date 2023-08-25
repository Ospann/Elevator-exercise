import styled from "styled-components";
import Elevator from "./Elevator";
import BuildingFloor from "../UI/BuildingFloor";

const FLOOR_HEIGHT = 60;
const ELEVATOR_WIDTH = 42.5;

interface IBuilding {
    currentFloors: number[];
    currentFloor: number;
    floors: number;
    elevators: number;
    distance: number;
}

const StyledBuilding = styled.div<{ elevator: number }>`
    min-width: 180px;
    width: ${(props) => props.elevator * ELEVATOR_WIDTH}px;
    background: gray;
    position: relative;
};
`

const Building = ({ currentFloors, floors, currentFloor, elevators, distance }: IBuilding) => {
    const buildingFloors = Array.from({ length: floors }, (_, index) => (
        <BuildingFloor key={index} height={FLOOR_HEIGHT} />
    ));

    const buildingElevators = Array.from({ length: elevators }, (_, index) => {
        const position = currentFloors[index] * FLOOR_HEIGHT;
        const aim = currentFloor + 1;
        const updated = currentFloors[index] === currentFloor;
        return <Elevator key={index} updated={updated} number={index} position={position} distance={distance} aim={aim} />;
    });

    return (
        <StyledBuilding data-testid="building" elevator={elevators} >
            {buildingFloors}
            {buildingElevators}
        </StyledBuilding>
    );
};

export default Building;
