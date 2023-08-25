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
  height: 70px;
  width: 70px;
  font-weight: bold;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ElevatorButton: React.FC<ElevatorButtonProps> = ({ pressed, ...rest }) => (
  <StyledElevatorButton aria-pressed={!!pressed} {...rest} />
);

export default ElevatorButton;
