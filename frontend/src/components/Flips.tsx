import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { AxiosError, CanceledError } from "../services/api-client";
import DroneService, { FlipDirection } from "../services/drone-service";
import FlipButton from "./FlipButton";

// Flip drone function
const flipDrone = (direction: FlipDirection) => {
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
            onClick={() => flipDrone("f")}
          />
        </HStack>
        <HStack spacing={3}>
          <FlipButton
            label="L"
            colorScheme="blue"
            onClick={() => flipDrone("l")}
          />
          <Text fontSize="lg" fontWeight="bold">
            Flips!
          </Text>
          <FlipButton
            label="R"
            colorScheme="red"
            onClick={() => flipDrone("r")}
          />
        </HStack>
        <HStack justifyContent="center">
          <FlipButton
            label="B"
            colorScheme="green"
            onClick={() => flipDrone("b")}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Flips;
