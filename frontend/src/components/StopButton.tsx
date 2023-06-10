import DroneButton from "./DroneButtons";
import { GoStop } from "react-icons/go";

const StopButton = () => {
  return <DroneButton size="md" colorScheme="red" text="Stop" leftIcon={<GoStop />} />;
};

export default StopButton;
