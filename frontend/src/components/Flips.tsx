import { VStack, HStack, Box, Text } from "@chakra-ui/react";
import FlipButton from "./FlipButton";

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
          <FlipButton label="F" colorScheme="yellow" />
        </HStack>
        <HStack spacing={3}>
          <FlipButton label="L" colorScheme="blue" />
          <Text fontSize="lg" fontWeight="bold">
            Flips!
          </Text>
          <FlipButton label="R" colorScheme="red" />
        </HStack>
        <HStack justifyContent="center">
          <FlipButton label="B" colorScheme="green" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Flips;
