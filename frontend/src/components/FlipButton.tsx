import { Button, ButtonProps } from "@chakra-ui/react";

interface FlipButtonProps extends ButtonProps {
  label: string;
  colorScheme: string;
  onClick: () => void;
}

const FlipButton = ({ label, colorScheme, onClick, ...props }: FlipButtonProps) => {
  return (
    <Button
      borderRadius="50%"
      width="50px"
      height="50px"
      bg={`${colorScheme}.500`}
      border="2px"
      borderColor={`${colorScheme}.600`}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};

export default FlipButton;
