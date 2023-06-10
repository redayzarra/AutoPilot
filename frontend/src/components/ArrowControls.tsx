import { VStack, HStack } from "@chakra-ui/react";
import ArrowKey from "./ArrowKey";
import {
  BiDownArrowAlt,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiUpArrowAlt,
} from "react-icons/bi";

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
