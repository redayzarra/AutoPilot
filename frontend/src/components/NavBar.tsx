import { Box, Divider, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/DroneText.png";
import Battery from "./Battery";
import FaceDetection from "./FaceDetection";
import SerialNumber from "./SerialNumber";

const NavBar = () => {
  return (
    <>
      <Box position="relative" marginX={5} marginY={2} marginBottom={2}>
        <HStack justifyContent="space-between">
          <HStack marginRight={7}>
            <FaceDetection />
          </HStack>
          <Image
            src={logo}
            width="250px"
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
          />
          <HStack spacing={5}>
            <SerialNumber />
            <Battery />
          </HStack>
        </HStack>
      </Box>
      <Divider orientation="horizontal" />
    </>
  );
};

export default NavBar;
