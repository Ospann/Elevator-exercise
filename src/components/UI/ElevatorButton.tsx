import styled from "styled-components";

interface ElevatorButtonProps {
  pressed?: boolean;
}

const StyledElevatorButton = styled.button<ElevatorButtonProps>`
  &[aria-pressed="true"] {
    border: 5px solid yellow;
  }
  border-radius: 50%;
  border: 5px solid black;
  height: 100px;
  width: 100px;
  font-weight: bold;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ElevatorButton: React.FC<ElevatorButtonProps> = ({ pressed, ...rest }) => {
  return <StyledElevatorButton aria-pressed={!!pressed} {...rest} />;
};

export default ElevatorButton;
