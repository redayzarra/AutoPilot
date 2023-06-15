import apiClient, { AxiosError, CanceledError } from "../services/api-client";
import { VStack } from "@chakra-ui/react";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import DroneButton from "./DroneButtons";

const FlightButtons = () => {
  const handleTakeoff = () => {
    const controller = new AbortController();

    apiClient
      .post("/takeoff", { signal: controller.signal })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Takeoff: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Takeoff: Axios error", error.message);
        }
      });

    return () => controller.abort();
  };

  const handleLand = () => {
    const controller = new AbortController();

    apiClient
      .post("/land", { signal: controller.signal })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Land: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Land: Axios error", error.message);
        }
      });

    return () => controller.abort();
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
