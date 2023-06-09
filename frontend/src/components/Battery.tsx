import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Battery = () => {
  const currentBattery = 100;
  let color;

  if (currentBattery > 50) {
    color = "green.400";
  } else if (currentBattery > 25) {
    color = "orange.400";
  } else {
    color = "red.400";
  }

  return (
    <CircularProgress value={currentBattery} color={color} size="60px" marginTop={2}>
      <CircularProgressLabel>{currentBattery}%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Battery;
