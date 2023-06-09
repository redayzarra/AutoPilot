import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";
import SerialNumber from "./SerialNumber";

const NavBar = () => {

  return (
    <HStack justifyContent="space-between" spacing={5} px={2}>
      <SerialNumber />
      <Image src={logo} boxSize="60px" marginY={-2} />

    </HStack>
  );
};

export default NavBar;
