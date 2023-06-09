import { Box, Text } from "@chakra-ui/react";

const SerialNumber = () => {
  const number = 3; // Obtain flight time from Drone
  
  return (
    <Box paddingRight={2}>
      <Text fontSize="lg" fontWeight="bold" display="inline">
        Flight Time: {"   "}
      </Text>
      <Text fontSize="lg" display="inline">
        {number}
      </Text>
    </Box>
  );
};

export default SerialNumber;
