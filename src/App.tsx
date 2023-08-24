import React, { useCallback, useEffect, useRef, useState } from "react";
import ElevatorButtons from "./components/shared/Buttons";
import Building from "./components/shared/Building";
import { Layout } from "./components/UI/Layout";
import { useForm } from "react-hook-form";
import InputForm from "./components/shared/InputForm";

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [elevatorRequests, setElevatorRequests] = useState<boolean[]>([]);
  const interval = useRef<number | undefined>();

  const onFloorRequest = useCallback(
    (floor: number) => {
      if (!elevatorRequests[floor] && floor !== currentFloor) {
        const newRequests = [...elevatorRequests];
        newRequests[floor] = true;
        setElevatorRequests(newRequests);
      }
    },
    [elevatorRequests, currentFloor]
  );

  const moveToFloor = useCallback(
    (floor: number) => {
      setCurrentFloor(floor);
      const newRequests = [...elevatorRequests];
      newRequests[floor] = false;
      setElevatorRequests(newRequests);
    },
    [elevatorRequests]
  );

  useEffect(() => {
    clearTimeout(interval.current);
    interval.current = setInterval(() => {
      for (let i = currentFloor; i < getValues("floors"); i += 1) {
        if (elevatorRequests[i]) {
          moveToFloor(i);
          return;
        }
      }
      for (let i = currentFloor; i >= 0; i -= 1) {
        if (elevatorRequests[i]) {
          moveToFloor(i);
          return;
        }
      }
    }, 500);
  }, [currentFloor, elevatorRequests, moveToFloor, getValues]);

  const handleFormSubmit = (data: { lifts: number, floors: number }) => {
    setValue("lifts", data.lifts || 1);
    setValue("floors", data.floors || 8);
    const currentFloors = Array.from({ length: data.lifts || 1 }, () => 0);
    setValue("currentFloors", currentFloors);
  };

  return (
    <Layout className="App">
      <InputForm register={register} onSubmit={handleSubmit(handleFormSubmit)} />
      <ElevatorButtons
        floors={Number(getValues("floors"))}
        onFloorRequest={onFloorRequest}
        pressed={elevatorRequests}
      />
      <Building
        floors={Number(getValues("floors")) || 8}
        elevators={Number(getValues("lifts")) || 1}
        currentFloors={getValues("currentFloors") || []}
        currentFloor={currentFloor}
      />
    </Layout>
  );
};

export default App;
