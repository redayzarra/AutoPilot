import { VStack } from "@chakra-ui/react";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import DroneButton from "./DroneButtons";

const FlightButtons = () => {
  return (
    <VStack align="start" marginTop={5}>
      <DroneButton text="Takeoff" leftIcon={<MdFlightTakeoff />} />
      <DroneButton text="Land" leftIcon={<MdFlightLand />} />
    </VStack>
  );
};

export default FlightButtons;
