import { Box, Text } from "@chakra-ui/react";
import apiClient, { CanceledError, AxiosError } from "../services/api-client";
import { useEffect, useState } from "react";

const SerialNumber = () => {
  const [serialNumber, setSerialNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/query/sn", {
        signal: controller.signal,
      })
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

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <Box paddingRight={2}>
        <Text fontSize="lg" fontWeight="bold" display="inline">
          Drone # {"   "}
        </Text>
        <Text fontSize="lg" display="inline">
          0TQZK5DED02L2S
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
