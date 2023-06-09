import { VStack, HStack, Spacer } from "@chakra-ui/react";
import FlipButton from "./FlipButton";

const Flips = () => {
  return (
    <VStack>
      <HStack width="full" justifyContent="center">
        <FlipButton label="F" colorScheme="yellow" />
      </HStack>
      <HStack width="full">
        <FlipButton label="L" colorScheme="blue" />
        <Spacer />
        <FlipButton label="R" colorScheme="red" />
      </HStack>
      <HStack width="full" justifyContent="center">
        <FlipButton label="B" colorScheme="green" />
      </HStack>
    </VStack>
  );
};

export default Flips;
