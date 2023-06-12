import axios from "axios";
import DroneButton from "./DroneButtons";
import { GoStop } from "react-icons/go";

const StopButton = () => {
  const handleStop = async () => {
    try {
      const response = await axios.post("http://localhost:5000/drone/stop");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DroneButton
      size="md"
      colorScheme="red"
      text="Stop"
      leftIcon={<GoStop />}
      marginTop="-50px"
      onClick={handleStop}
    />
  );
};

export default StopButton;
