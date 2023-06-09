import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Battery = () => {
  const currentBattery = 23;

  return (
    <CircularProgress value={currentBattery} color="green.400">
      <CircularProgressLabel>{currentBattery}%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Battery;
