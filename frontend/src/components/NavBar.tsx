import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} />
    </HStack>
  );
};

export default NavBar;
