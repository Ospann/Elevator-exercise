/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useState } from "react";
import ElevatorButtons from "./components/shared/Buttons";
import Building from "./components/shared/Building";
import { Layout } from "./components/UI/Layout";
import { useForm } from "react-hook-form";
import InputForm from "./components/shared/InputForm";
import { Earth } from "./components/UI/Earth";
import findNearestFloorIndex from "./helpers/findNearestFloorIndex";
import handleSoundPlay from "./helpers/handleSoundPlay";

interface FormData {
  lifts: number;
  floors: number;
  busies?: boolean[];
  oldFloors?: number[];
}

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<FormData>();

  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [elevatorRequests, setElevatorRequests] = useState<boolean[]>([]);
  const [distance, setDistance] = useState(1);

  const floors = getValues("floors") || 8;
  const evelators = getValues("lifts") || 1;
  const [elevatorsFloor, setElevatorsFloor] = useState([0]);

  const onFloorRequest = useCallback(
    (floor: number) => {
      if (!elevatorRequests[floor] && floor !== currentFloor) {
        const newRequests = [...elevatorRequests];
        newRequests[floor] = true;
        setElevatorRequests(newRequests);
      }
    }, [elevatorRequests, currentFloor]
  );

  const moveToFloor = useCallback(
    (floor: number) => {
      setCurrentFloor(floor);
      const newRequests = [...elevatorRequests];
      newRequests[floor] = false;
      setElevatorRequests(newRequests);
    }, [elevatorRequests]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < floors; i++) {
        if (elevatorRequests[i]) {
          moveToFloor(i);
          return;
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [elevatorRequests, moveToFloor, floors]);

  const handleFormSubmit = (data: FormData) => {
    setValue("lifts", data.lifts);
    setValue("floors", data.floors);
    const currentFloors = Array.from({ length: data.lifts }, () => 0);
    const busies = Array.from({ length: data.lifts }, () => false);
    setElevatorsFloor(currentFloors);
    setValue("busies", busies);
    setCurrentFloor(0);
  };

  useEffect(() => {
    const busies = getValues("busies") || [false];
    const updatedBusies = [...busies];
    const updatedCurrentFloors = [...elevatorsFloor];
    const isAllTrue = busies.every((value) => value === true);
    if (isAllTrue) return;

    const index = findNearestFloorIndex(currentFloor, elevatorsFloor, busies);
    const distance = Math.abs(elevatorsFloor[index] - currentFloor);
    setDistance(distance);
    updatedBusies[index] = true;
    updatedCurrentFloors[index] = currentFloor;

    setValue("busies", updatedBusies);
    setElevatorsFloor(updatedCurrentFloors)
    setTimeout(() => {
      updatedBusies[index] = false;
      setValue("busies", updatedBusies);
      handleSoundPlay();
    }, distance * 1000);
  }, [currentFloor, getValues, setValue])

  return (
    <>
      <Layout className="App">
        <InputForm register={register} onSubmit={handleSubmit(handleFormSubmit)} />
        <ElevatorButtons
          floors={floors}
          onFloorRequest={onFloorRequest}
          pressed={elevatorRequests}
        />
        <Building
          floors={floors}
          elevators={evelators}
          currentFloors={elevatorsFloor}
          currentFloor={currentFloor}
          distance={distance}
        />
      </Layout>
      <Earth />
    </>
  );
};

export default App;
