import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import apiClient, {CanceledError, AxiosError} from "../services/api-client";
import { useEffect, useState } from "react";

const Battery = () => {
  const [currentBattery, setCurrentBattery] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/query/battery", {
        signal: controller.signal,
      })
      .then((response) => {
        setCurrentBattery(response.data.response);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Axios error", error.message);
        }
      });

    return () => controller.abort();

  }, []);

  let color;
  if (currentBattery > 50) {
    color = "green.400";
  } else if (currentBattery > 25) {
    color = "orange.400";
  } else {
    color = "red.400";
  }

  return (
    <CircularProgress value={currentBattery} color={color} size="60px">
      <CircularProgressLabel fontWeight="bold">
        {currentBattery}%
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Battery;
