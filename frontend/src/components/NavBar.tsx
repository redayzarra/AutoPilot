import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";
import SerialNumber from "./SerialNumber";
import Battery from "./Battery";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" spacing={5} marginX={2} marginY={2}>
      <SerialNumber />
      <Image src={logo} boxSize="75px" marginY={-5} />

      <Box>
        <Battery />
      </Box>
    </HStack>
  );
};

export default NavBar;
