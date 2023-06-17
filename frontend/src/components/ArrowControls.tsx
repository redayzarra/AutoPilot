import { HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import { AxiosError, CanceledError } from "../services/api-client";

const ArrowControls = () => {
  // initial state for arrow keys
  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

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

  useEffect(() => {
    const keydownHandler = ({ key }: KeyboardEvent) => {
      setKeys((keys) => ({ ...keys, [key]: true }));

      switch (key) {
        case "ArrowUp":
          moveDrone("forward");
          break;
        case "ArrowDown":
          moveDrone("back");
          break;
        case "ArrowLeft":
          rotateDrone("ccw");
          break;
        case "ArrowRight":
          rotateDrone("cw");
          break;
      }
    };

    const keyupHandler = ({ key }: KeyboardEvent) => {
      setKeys((keys) => ({ ...keys, [key]: false }));
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return (
    <VStack align="center" marginRight="50px">
      <ArrowKey
        active={keys.ArrowUp}
        icon={BiUpArrowAlt}
        onClick={() => moveDrone("forward")}
      />
      <HStack>
        <ArrowKey
          active={keys.ArrowLeft}
          icon={BiLeftArrowAlt}
          onClick={() => rotateDrone("ccw")}
        />
        <ArrowKey
          active={keys.ArrowDown}
          icon={BiDownArrowAlt}
          onClick={() => moveDrone("back")}
        />
        <ArrowKey
          active={keys.ArrowRight}
          icon={BiRightArrowAlt}
          onClick={() => rotateDrone("cw")}
        />
      </HStack>
    </VStack>
  );
};

export default ArrowControls;
