import React from "react";
import styled from "styled-components";
import ElevatorButton from "../UI/ElevatorButton";

const StyledElevatorButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
`;

interface ElevatorButtonsProps {
    floors: number;
    pressed: boolean[];
    onFloorRequest: (floor: number) => void;
}

const ElevatorButtons: React.FC<ElevatorButtonsProps> = ({
    floors,
    pressed,
    onFloorRequest,
    ...rest
}) => {
    const onButtonPress = React.useCallback(
        (index: number) => () => {
            if (typeof onFloorRequest === "function") {
                onFloorRequest(index);
            }
        },
        [onFloorRequest]
    );

    const buttons = [];
    for (let i = 0; i <= floors; i += 1) {
        buttons.push(
            <ElevatorButton
                key={i}
                pressed={pressed[i]}
                onClick={onButtonPress(i)}
            >
                {i}
            </ElevatorButton>
        );
    }

    return <StyledElevatorButtons {...rest}>{buttons.reverse()}</StyledElevatorButtons>;
};

export default ElevatorButtons;
