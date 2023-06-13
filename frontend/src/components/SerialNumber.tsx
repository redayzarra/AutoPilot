import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface DroneNumber {
  status: string;
  response: string;
}

const SerialNumber = () => {
  const [serialNumber, setSerialNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<DroneNumber>("http://localhost:5000/drone/query/sn")
      .then((res) => {
        setSerialNumber(res.data.response);
        setError(null);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return (
      <Box paddingRight={2}>
        <Text fontSize="lg" fontWeight="bold" display="inline">
          Drone # {"   "}
        </Text>
        <Text fontSize="lg" display="inline">
          Error
        </Text>
      </Box>
    );
  }

  return (
    <Box paddingRight={2}>
      <Text fontSize="lg" fontWeight="bold" display="inline">
        Drone # {"   "}
      </Text>
      <Text fontSize="lg" display="inline">
        {serialNumber}
      </Text>
    </Box>
  );
};

export default SerialNumber;
