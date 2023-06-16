import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useStopwatch } from "react-timer-hook";
import useDroneStore from "../services/store";

const FlightTime = () => {
  const { seconds, minutes, start, pause } = useStopwatch({ autoStart: false });

  const droneState = useDroneStore((state) => state.droneState);

  useEffect(() => {
    if (droneState === "flying") {
      start();
    } else if (droneState === "landed") {
      pause();
    }
  }, [droneState, start, pause]);

  return (
    <Box paddingRight={2}>
      <Text fontSize="lg" fontWeight="bold" display="inline" marginRight={1}>
        Flight Time:
      </Text>
      <Text fontSize="lg" display="inline">
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </Text>
    </Box>
  );
};

export default FlightTime;
