import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { AxiosError, CanceledError } from "../services/api-client";
import DroneService, { Direction } from "../services/drone-service";
import FlipButton from "./FlipButton";

// Flip drone function
const flipDrone = (direction: Direction) => {
  const { request, cancel } = DroneService.flip(direction); // Use flip method from DroneService
  request
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error instanceof CanceledError) {
        console.error("Request canceled", error.message);
      } else if (error instanceof AxiosError) {
        console.error("Axios error", error.message);
      }
    });
  return () => cancel();
};

const Flips = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="full"
    >
      <VStack spacing={1}>
        <HStack justifyContent="center">
          <FlipButton
            label="F"
            colorScheme="yellow"
            onClick={() => flipDrone("F")}
          />
        </HStack>
        <HStack spacing={3}>
          <FlipButton
            label="L"
            colorScheme="blue"
            onClick={() => flipDrone("L")}
          />
          <Text fontSize="lg" fontWeight="bold">
            Flips!
          </Text>
          <FlipButton
            label="R"
            colorScheme="red"
            onClick={() => flipDrone("R")}
          />
        </HStack>
        <HStack justifyContent="center">
          <FlipButton
            label="B"
            colorScheme="green"
            onClick={() => flipDrone("B")}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Flips;
