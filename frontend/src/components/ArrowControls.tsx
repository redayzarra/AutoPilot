import { HStack, VStack } from "@chakra-ui/react";
import {
  BiDownArrowAlt,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiUpArrowAlt,
} from "react-icons/bi";
import ArrowKey from "./ArrowKey";

const ArrowControls = () => {
  return (
    <VStack align="center">
      <ArrowKey icon={BiUpArrowAlt} />
      <HStack>
        <ArrowKey icon={BiLeftArrowAlt} />
        <ArrowKey icon={BiDownArrowAlt} />
        <ArrowKey icon={BiRightArrowAlt} />
      </HStack>
    </VStack>
  );
};

export default ArrowControls;
