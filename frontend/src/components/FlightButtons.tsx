import { VStack } from "@chakra-ui/react";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { AxiosError, CanceledError } from "../services/api-client";
import DroneService from "../services/drone-service";
import DroneButton from "./DroneButtons";
import useDroneStore from "../services/store";

const FlightButtons = () => {
  const setDroneState = useDroneStore((state) => state.setDroneState);

  const handleTakeoff = () => {
    const { request, cancel } = DroneService.takeOff();
    request
      .then((response) => {
        console.log(response.data);
        setDroneState("flying");
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Takeoff: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Takeoff: Axios error", error.message);
        }
      });

    return () => cancel();
  };

  const handleLand = () => {
    const { request, cancel } = DroneService.land();
    request
      .then((response) => {
        console.log(response.data);
        setDroneState("landed");
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Land: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Land: Axios error", error.message);
        }
      });

    return () => cancel();
  };

  return (
    <VStack align="start" marginTop={5}>
      <DroneButton
        text="Takeoff"
        leftIcon={<MdFlightTakeoff />}
        onClick={handleTakeoff}
      />
      <DroneButton
        text="Land"
        leftIcon={<MdFlightLand />}
        onClick={handleLand}
      />
    </VStack>
  );
};

export default FlightButtons;
