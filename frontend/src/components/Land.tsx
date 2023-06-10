import { Button } from "@chakra-ui/react";
import { MdFlightLand } from "react-icons/md";

const Land = () => {
  return (
    <Button
      leftIcon={<MdFlightLand />}
      colorScheme="gray"
      variant="outline"
      marginTop={5}
      size="lg"
    >
      Land
    </Button>
  );
};

export default Land;
