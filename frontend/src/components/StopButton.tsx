import DroneButton from "./DroneButtons";
import { GoStop } from "react-icons/go";

const StopButton = () => {
  return (
    <DroneButton
      size="md"
      colorScheme="red"
      text="Stop"
      leftIcon={<GoStop />}
      marginTop="-50px"
    />
  );
};

export default StopButton;
