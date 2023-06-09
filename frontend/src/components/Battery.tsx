import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Battery = () => {
  return (
    <CircularProgress value={40} color="green.400">
      <CircularProgressLabel>40%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Battery;
