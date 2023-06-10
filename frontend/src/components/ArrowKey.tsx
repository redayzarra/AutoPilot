import { Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ArrowKeyProps {
  icon: IconType;
}

const ArrowKey = ({ icon }: ArrowKeyProps) => {
  return (
    <Button
      colorScheme="gray"
      variant="outline"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon as={icon} />
    </Button>
  );
};

export default ArrowKey;
