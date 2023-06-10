import { Button } from "@chakra-ui/react";
import { GoStop } from "react-icons/go";

const StopButton = () => {
  return (
    <Button
      leftIcon={<GoStop />}
      colorScheme="gray"
      variant="outline"
      marginTop={5}
      size="lg"
    >
      Stop
    </Button>
  );
};

export default StopButton;
