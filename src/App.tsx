/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import ElevatorButtons from "./components/shared/Buttons";
import Building from "./components/shared/Building";
import { Layout } from "./components/UI/Layout";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "./components/shared/InputForm";
import { Earth } from "./components/UI/Earth";
import findNearestFloorIndex from "./helpers/findNearestFloorIndex";

interface FormData {
  lifts: number;
  floors: number;
  busies?: boolean[];
  oldFloors?: number[];
}

interface IElevatorInfo {
  index: number,
  aim: number[],
  start: number,
}

const App: React.FC = () => {
  const methods = useForm<FormData>();
  const { setValue, getValues } = methods;

  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [elevatorRequests, setElevatorRequests] = useState<boolean[]>([]);

  const [floors, setFloors] = useState(8);
  const [elevators, setElevators] = useState(1);
  const [elevatorsInfo, setElevatorsInfo] = useState<IElevatorInfo[]>([{
    index: 0,
    aim: [],
    start: 0,
  }]);

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
    const lifts = Math.min(data.lifts, 10);
    setFloors(data.floors || 8);
    setElevators(lifts)
    setCurrentFloor(0);
    const currentFloors = Array.from({ length: lifts }, (_, index) => ({
      aim: [],
      index,
      start: 0,
    }));
    setElevatorsInfo(currentFloors);
  };


  useEffect(() => {
    const updatedCurrentFloors = [...elevatorsInfo];
    const index = findNearestFloorIndex(currentFloor, elevatorsInfo);

    if (updatedCurrentFloors[index].aim?.includes(currentFloor)) {
      updatedCurrentFloors[index].aim = updatedCurrentFloors[index].aim.filter(floor => floor !== currentFloor);
    } else {
      if (updatedCurrentFloors[index].start !== currentFloor) {
        updatedCurrentFloors[index].aim.push(currentFloor);
      }
    }
    setElevatorsInfo(updatedCurrentFloors);
  }, [currentFloor, getValues, setValue])

  const handleChangeInfo = (info: IElevatorInfo[]) => setElevatorsInfo(info);

  return (
    <>
      <Layout className="App">
        <FormProvider {...methods}>
          <InputForm onSubmit={handleFormSubmit} />
        </FormProvider>
        <ElevatorButtons
          floors={floors}
          onFloorRequest={onFloorRequest}
          pressed={elevatorRequests}
        />
        <Building
          floors={floors}
          elevators={elevators}
          setElevatorInfo={handleChangeInfo}
          currentFloors={elevatorsInfo}
        />
      </Layout>
      <Earth />
    </>
  );
};

export default App;
