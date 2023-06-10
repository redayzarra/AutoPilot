import { Button, ButtonProps } from "@chakra-ui/react";

interface DroneButtonProps extends ButtonProps {
  text: string;
  leftIcon: React.ReactElement;
}

const DroneButton = ({ text, leftIcon, ...props }: DroneButtonProps) => {
  return (
    <Button
      leftIcon={leftIcon}
      colorScheme="gray"
      variant="outline"
      size="lg"
      {...props}
    >
      {text}
    </Button>
  );
};

export default DroneButton;
