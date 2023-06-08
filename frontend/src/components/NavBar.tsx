import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/MyLogo.png";

const NavBar = () => {
  const number = 3;

  return (
    <HStack justifyContent="space-between" spacing={5} px={2}>
      <Box paddingRight={2}>
        <Text fontSize="md" fontWeight="bold" display="inline">
          Drone: {"   "}
        </Text>
        <Text fontSize="md" display="inline">
          {number}
        </Text>
      </Box>

      <Image src={logo} boxSize="60px" marginY={-2} />
    </HStack>
  );
};

export default NavBar;
