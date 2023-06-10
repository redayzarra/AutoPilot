import { Box, Divider, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/DroneText.png";
import Battery from "./Battery";
import FlightTime from "./FlightTime";
import SerialNumber from "./SerialNumber";

const NavBar = () => {
  return (
    <>
      <Box marginX={5} marginY={2} marginBottom={2}>
        <HStack justifyContent="space-between">
          <HStack marginRight={7}>
            <SerialNumber />
          </HStack>
          <Image src={logo} marginY="-150px" width="250px" marginLeft="60px"/>
          <HStack spacing={5}>
            <FlightTime />
            <Battery />
          </HStack>
        </HStack>
      </Box>
      <Divider orientation='horizontal' />
    </>
  );
};

export default NavBar;
