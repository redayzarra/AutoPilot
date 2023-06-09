import { Box, Text } from "@chakra-ui/react";

const SerialNumber = () => {
  const number = 3;
  
  return (
    <Box paddingRight={2}>
      <Text fontSize="md" fontWeight="bold" display="inline">
        Drone: {"   "}
      </Text>
      <Text fontSize="md" display="inline">
        {number}
      </Text>
    </Box>
  );
};

export default SerialNumber;
