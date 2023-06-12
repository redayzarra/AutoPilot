import { Box, Text } from "@chakra-ui/react";

const FlightTime = () => {
  const number = "03:23"; // Obtain flight time from Drone
  
  return (
    <Box paddingRight={2}>
      <Text fontSize="lg" fontWeight="bold" display="inline" marginRight={1}>
        Flight Time: {"   "}
      </Text>
      <Text fontSize="lg" display="inline">
        {number}
      </Text>
    </Box>
  );
};

export default FlightTime;
