import styled from "styled-components";

interface StyledElevatorProps {
  position: number;
}

const StyledElevator = styled.div<StyledElevatorProps>`
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
  transform: translateY(-${(props) => props.position}px);
  transition: 1s ease-in-out transform;
`;

interface StyledElevatorCageProps {
  number: number;
}

const StyledElevatorCage = styled.div<StyledElevatorCageProps>`
  margin-left: ${(props) => props.number * 2.5}rem;
  height: 40px;
  width: 30px;
  background: black;
  border-radius: 3px;
`;

interface ElevatorProps extends StyledElevatorProps, StyledElevatorCageProps { }

export const Elevator: React.FC<ElevatorProps> = (props) => {
  return (
    <StyledElevator position={props.position}>
      <StyledElevatorCage number={props.number} />
    </StyledElevator>
  );
};
