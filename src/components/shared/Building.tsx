import styled from "styled-components";
import Elevator from "./Elevator";
import BuildingFloor from "../UI/BuildingFloor";
import findNearestFloorIndex from "../../helpers/findNearestFloorIndex";
import { memo, useMemo } from 'react';
const FLOOR_HEIGHT = 60;
const ELEVATOR_WIDTH = 42.5;

interface IBuilding {
    currentFloors: number[];
    currentFloor: number;
    floors: number;
    elevators: number;
    busies: boolean[];
}

const StyledBuilding = styled.div<{ elevator: number }>`
    min-width: 200px;
    width: ${(props) => props.elevator * ELEVATOR_WIDTH}px;
    background: gray;
    position: relative;
`;

/**
 * Component which render Building
 * @param param0 
 * @returns 
 */
const Building = memo(({ currentFloors, currentFloor, floors, elevators, busies }: IBuilding) => {
    console.log(currentFloor, currentFloors, busies)
    const nearestFloorIndex = useMemo(() => {
        const index = findNearestFloorIndex(currentFloor, currentFloors, busies)
        busies[index] = true;
        return index;
    }, [currentFloor, currentFloors, busies]);
    setTimeout(() => busies[nearestFloorIndex] = false, 1000);
    currentFloors[nearestFloorIndex] = currentFloor;

    const buildingFloors = Array.from({ length: floors }, (_, index) => (
        <BuildingFloor key={index} height={FLOOR_HEIGHT} />
    ));

    const buildingElevators = Array.from({ length: elevators }, (_, index) => {
        const position = currentFloors[index] * FLOOR_HEIGHT;
        return <Elevator key={index} number={index} position={position} />;
    });


    return (
        <StyledBuilding data-testid="building" elevator={elevators} >
            {buildingFloors}
            {buildingElevators}
        </StyledBuilding>
    );
});

export default Building;