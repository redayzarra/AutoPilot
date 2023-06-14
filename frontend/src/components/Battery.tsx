import {
  CircularProgress,
  CircularProgressLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError, CanceledError } from "../services/api-client";
import DroneService from "../services/drone-service";

const Battery = () => {
  const [currentBattery, setCurrentBattery] = useState(0);

  useEffect(() => {
    const { request, cancel } = DroneService.getBattery();
    request
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

    return () => cancel();
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
