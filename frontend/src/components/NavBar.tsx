import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";
import SerialNumber from "./SerialNumber";
import Battery from "./Battery";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" spacing={5} px={2}>
      <SerialNumber />
      <Image src={logo} boxSize="60px" marginY={-2} />

      <Box>
        <Battery />
      </Box>
    </HStack>
  );
};

export default NavBar;
