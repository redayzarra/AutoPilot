import { GoStop } from "react-icons/go";
import { AxiosError, CanceledError } from "../services/api-client";
import DroneService from "../services/drone-service";
import DroneButton from "./DroneButtons";

const StopButton = () => {
  const handleStop = () => {
    const { request, cancel } = DroneService.land();
    request
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.error("Stop: Request canceled", error.message);
        } else if (error instanceof AxiosError) {
          console.error("Stop: Axios error", error.message);
        }
      });

    return () => cancel();
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
