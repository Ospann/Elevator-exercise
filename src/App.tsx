/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useState } from "react";
import ElevatorButtons from "./components/shared/Buttons";
import Building from "./components/shared/Building";
import { Layout } from "./components/UI/Layout";
import { useForm } from "react-hook-form";
import InputForm from "./components/shared/InputForm";
import { Earth } from "./components/UI/Earth";

interface FormData {
  lifts: number;
  floors: number;
  currentFloors?: number[];
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

  const floors = getValues("floors") || 8;
  const evelators = getValues("lifts") || 1;

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
    setValue("currentFloors", currentFloors);
    setCurrentFloor(0);
  };

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
          currentFloors={getValues("currentFloors") || []}
          currentFloor={currentFloor}
        />
      </Layout>
      <Earth />
    </>
  );
};

export default App;
