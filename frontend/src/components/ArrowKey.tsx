import { Button, Icon } from "@chakra-ui/react";

interface ArrowKeyProps {
  icon: any;
  active: boolean;
  onClick: () => void;
}

const ArrowKey = ({ icon, active, onClick }: ArrowKeyProps) => {
  return (
    <Button
      colorScheme={active ? "blue" : "gray"}
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
