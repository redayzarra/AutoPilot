import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError, CanceledError } from "../services/api-client";
import DroneService from "../services/drone-service";

const SerialNumber = () => {
  const [serialNumber, setSerialNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delay = 3000; // delay in milliseconds

    const timeoutId = setTimeout(() => {
      const { request, cancel } = DroneService.getBattery();
      request
        .then((response) => {
          setSerialNumber(response.data.response);
          setError(null);
        })
        .catch((error) => {
          if (error instanceof CanceledError) {
            console.error("Request canceled", error.message);
          } else if (error instanceof AxiosError) {
            setError(error.message);
          }
        });
      return () => {
        cancel();
      };
    }, delay);

    // Clear timeout
    return () => clearTimeout(timeoutId);
  }, []);

  if (error) {
    return (
      <Box paddingRight={2}>
        <Text fontSize="lg" fontWeight="bold" display="inline">
          Drone # {"   "}
        </Text>
        <Text fontSize="lg" display="inline">
          Fetching...
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
