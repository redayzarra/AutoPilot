import { Button, Icon } from "@chakra-ui/react";

interface ArrowKeyProps {
  icon: any;
  onClick: () => void;
}

const ArrowKey = ({ icon, onClick }: ArrowKeyProps) => {
  return (
    <Button
      colorScheme="gray"
      variant="outline"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
    >
      <Icon as={icon} />
    </Button>
  );
};

export default ArrowKey;
