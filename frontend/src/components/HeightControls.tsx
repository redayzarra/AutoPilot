import { VStack, Text } from "@chakra-ui/react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import DroneService, { MoveVertical } from "../services/drone-service"; // import DroneService
import ArrowKey from "./ArrowKey";
import { AxiosError, CanceledError } from "../services/api-client";

const HeightControls = () => {
  const moveDrone = (direction: MoveVertical) => {
    const { request, cancel } = DroneService.move(direction); // Pass the direction string directly
    request
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Move: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Move: Axios error", error.message);
        }
      });
    return () => cancel();
  };

  return (
    <>
      <VStack>
        <Text fontWeight="bold">Height</Text>
        <VStack align="center">
          <ArrowKey icon={BiUpArrowAlt} onClick={() => moveDrone("up")} />
          <ArrowKey icon={BiDownArrowAlt} onClick={() => moveDrone("down")} />
        </VStack>
      </VStack>
    </>
  );
};

export default HeightControls;
