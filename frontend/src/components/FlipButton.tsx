import { Button, ButtonProps } from "@chakra-ui/react";

interface FlipButtonProps extends ButtonProps {
  label: string;
  colorScheme: string;
}

const FlipButton = ({ label, colorScheme, ...props }: FlipButtonProps) => {
  return (
    <Button
      borderRadius="50%"
      width="50px"
      height="50px"
      colorScheme={colorScheme}
      border="2px"
      borderColor={`${colorScheme}.500`}
      {...props}
    >
      {label}
    </Button>
  );
};

export default FlipButton;
