import { Button } from "@chakra-ui/react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const TakeOff = () => {
  return (
    <Button
      leftIcon={<BsFillRocketTakeoffFill />}
      colorScheme="pink"
      variant="solid"
    >
      Takeoff
    </Button>
  );
};

export default TakeOff;
