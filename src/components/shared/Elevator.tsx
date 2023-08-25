import styled from "styled-components";

const StyledElevator = styled.div<{ position: number; }>`
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

const StyledElevatorCage = styled.div<{ number: number }>`
  margin-left: ${(props) => props.number * 2.5}rem;
  height: 40px;
  width: 30px;
  background: black;
  border-radius: 3px;
`;

interface ElevatorProps {
  position: number;
  number: number
}

const Elevator: React.FC<ElevatorProps> = ({ position, number }) => {
  return (
    <StyledElevator position={position} data-testid="elevator">
      <StyledElevatorCage number={number} data-testid="elevator-cage" />
    </StyledElevator>
  );
};
export default Elevator;