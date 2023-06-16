import { HStack, VStack } from "@chakra-ui/react";
import {
  BiDownArrowAlt,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiUpArrowAlt,
} from "react-icons/bi";
import ArrowKey from "./ArrowKey";
import DroneService, {
  MoveDirection,
  RotateDirection,
} from "../services/drone-service";
import { AxiosError, CanceledError } from "axios";

const ArrowControls = () => {
  const moveDrone = (direction: MoveDirection) => {
    const { request, cancel } = DroneService.move(direction);
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

  const rotateDrone = (direction: RotateDirection) => {
    const { request, cancel } = DroneService.rotate(direction);
    request
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Rotate: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Rotate: Axios error", error.message);
        }
      });
    return () => cancel();
  };

  return (
    <VStack align="center" marginRight="50px">
      <ArrowKey icon={BiUpArrowAlt} onClick={() => moveDrone("forward")} />
      <HStack>
        <ArrowKey icon={BiLeftArrowAlt} onClick={() => rotateDrone("ccw")} />
        <ArrowKey icon={BiDownArrowAlt} onClick={() => moveDrone("back")} />
        <ArrowKey icon={BiRightArrowAlt} onClick={() => rotateDrone("cw")} />
      </HStack>
    </VStack>
  );
};

export default ArrowControls;
