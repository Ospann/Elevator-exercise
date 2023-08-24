import styled from "styled-components";

const StyledElevatorShaft = styled.div``;

interface BuildingFloorProps {
  height: number;
}

const StyledBuildingFloor = styled.div<BuildingFloorProps>`
  height: ${(props) => props.height}px;
  padding: 10px;
  display: flex;
  gap: 10px;
  box-sizing: border-box;

  ${StyledElevatorShaft} {
    flex: 1 1 auto;
    background-color: #fff;
  }
`;

const BuildingFloor: React.FC<BuildingFloorProps> = ({ height, ...rest }) => {
  return (
    <StyledBuildingFloor height={height} {...rest}>
      <StyledElevatorShaft />
    </StyledBuildingFloor>
  );
};

export default BuildingFloor;
