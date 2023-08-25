import styled from "styled-components";

interface ElevatorButtonProps {
  pressed?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const StyledElevatorButton = styled.button<ElevatorButtonProps>`
  &[aria-pressed="true"] {
    border: 5px solid #0000FF;
  }
  border-radius: 50%;
  border: 5px solid black;
  min-height: 40px;
  min-width: 40px;
  aspect-ratio: 1 / 1; 
  font-weight: bold;
  font-size: 25px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ElevatorButton: React.FC<ElevatorButtonProps> = ({ pressed, ...rest }) => (
  <StyledElevatorButton aria-pressed={!!pressed} {...rest} />
);

export default ElevatorButton;
