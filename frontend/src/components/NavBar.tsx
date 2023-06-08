import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize="60px" marginX={2} marginY={-2} />
      <Text fontSize="md" as="b">
        Serial Number:
      </Text>
      <Text>Number</Text>
    </HStack>
  );
};

export default NavBar;
