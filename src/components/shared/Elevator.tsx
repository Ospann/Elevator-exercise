import styled from "styled-components";
import { useState, useEffect } from 'react';
import handleSoundPlay from '../../helpers/handleSoundPlay'
const StyledElevator = styled.div<{ position: number, floor: number }>`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  flex-direction: row;
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: ${(props) => props.floor}s ease-in-out transform;
  transform: translateY(-${(props) => props.position}px);
  `;

const StyledElevatorCage = styled.div<{ number: number }>`
  margin-left: ${(props) => props.number * 2.5}rem;
  height: 40px;
  width: 30px;
  background: black;
  color:white;
  display: flex;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
`;

interface ElevatorProps {
  position: number;
  number: number;
  distance: number;
  aim: number;
  setElevatorInfo: (data:{ aim: number, index: number, start: number }[]) => void;
  currentFloors: { aim: number, index: number, start: number }[]
}

const Elevator: React.FC<ElevatorProps> = ({ position, number, distance, aim, currentFloors, setElevatorInfo }) => {
  const [currentFloor, setCurrentFloor] = useState(1);

  useEffect(() => {
    let isMounted = true;
    let targetFloor = currentFloor;

    const interval = setInterval(() => {
      if ((currentFloor === aim)) return;

      if (targetFloor === aim) {
        clearInterval(interval);
      } else if (targetFloor > aim) {
        targetFloor -= 1;
      } else if (targetFloor < aim) {
        targetFloor += 1;
      }

      if (isMounted && targetFloor !== currentFloor) {
        setCurrentFloor(targetFloor);
        if (targetFloor === aim) {
          const updatedCurrentFloors = [...currentFloors];
          updatedCurrentFloors[number].start = updatedCurrentFloors[number].aim;
          setElevatorInfo(updatedCurrentFloors);
          handleSoundPlay();
        }
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [aim, currentFloor, currentFloors, number, setElevatorInfo]);

  return (
    <StyledElevator position={position} floor={distance} data-testid="elevator">
      <StyledElevatorCage number={number} data-testid="elevator-cage">
        {distance > 0 ? `${currentFloor}` : currentFloor}
      </StyledElevatorCage>
    </StyledElevator>
  );
};


export default Elevator;
