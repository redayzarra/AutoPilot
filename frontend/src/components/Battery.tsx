import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Battery = () => {
  const [currentBattery, setCurrentBattery] = useState(0);

  useEffect(() => {
    const getBatteryLevel = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/drone/query/battery"
        );
        setCurrentBattery(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    getBatteryLevel();
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
