import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";
import Battery from "./Battery";
import FlightTime from "./FlightTime";
import SerialNumber from "./SerialNumber";

const NavBar = () => {
  return (
    <Box marginX={2} marginY={2}>
      <HStack justifyContent="space-between">
        <HStack marginRight={7}>
          <SerialNumber />
        </HStack>
        <Image src={logo} boxSize="75px" marginY={-5} />
        <HStack spacing={5}>
          <FlightTime />
          <Battery />
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
