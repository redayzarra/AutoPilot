import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/DroneText.png";
import Battery from "./Battery";
import FlightTime from "./FlightTime";
import SerialNumber from "./SerialNumber";

const NavBar = () => {
  return (
    <Box marginX={5} marginY={2} marginBottom={5}>
      <HStack justifyContent="space-between">
        <HStack marginRight={7}>
          <SerialNumber />
        </HStack>
        <Image src={logo} marginY="-100px" width="200px"/>
        <HStack spacing={5}>
          <FlightTime />
          <Battery />
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
