import { VStack } from "@chakra-ui/react";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import DroneButton from "./DroneButtons";
import { GoStop } from "react-icons/go";

const FlightButtons = () => {
  return (
    <VStack align="start">
      <DroneButton text="Takeoff" leftIcon={<MdFlightTakeoff />} />
      <DroneButton text="Stop" leftIcon={<GoStop />} />
      <DroneButton text="Land" leftIcon={<MdFlightLand />} />
    </VStack>
  );
};

export default FlightButtons;
