import styled from "styled-components";
import Elevator from "./Elevator";
import BuildingFloor from "../UI/BuildingFloor";

const FLOOR_HEIGHT = 60;
const ELEVATOR_WIDTH = 42.5;

interface IBuilding {
    currentFloors: { aim: number, index: number; start:number }[];
    floors: number;
    elevators: number;
    setElevatorInfo: (data:{ aim: number, index: number; start: number }[]) => void;
}

const StyledBuilding = styled.div<{ elevator: number }>`
    min-width: 180px;
    width: ${(props) => props.elevator * ELEVATOR_WIDTH}px;
    background: gray;
    position: relative;
};
`

const Building = ({ currentFloors, floors, elevators,setElevatorInfo }: IBuilding) => {
    const buildingFloors = Array.from({ length: floors }, (_, index) => (
        <BuildingFloor key={index} height={FLOOR_HEIGHT} />
    ));

    const buildingElevators = Array.from({ length: elevators }, (_, index) => {
        const position = currentFloors[index].aim * FLOOR_HEIGHT;
        const distance = Math.abs(currentFloors[index].aim - currentFloors[index].start)
        return <Elevator currentFloors={currentFloors} key={index} setElevatorInfo={setElevatorInfo}  number={index} position={position} distance={distance} aim={currentFloors[index].aim + 1} />;
    });

    return (
        <StyledBuilding data-testid="building" elevator={elevators} >
            {buildingFloors}
            {buildingElevators}
        </StyledBuilding>
    );
};

export default Building;