import { Button } from "@chakra-ui/react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const TakeOff = () => {
  return (
    <Button
      leftIcon={<BsFillRocketTakeoffFill />}
      colorScheme="gray"
      variant="outline"
      marginTop={5}
      size='lg'
    >
      Takeoff
    </Button>
  );
};

export default TakeOff;
