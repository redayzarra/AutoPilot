import axios from "axios";
import { VStack } from "@chakra-ui/react";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import DroneButton from "./DroneButtons";

const FlightButtons = () => {
  const handleTakeoff = () => {
    axios
      .post("http://localhost:5000/drone/takeoff")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLand = () => {
    axios
      .post("http://localhost:5000/drone/land")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <VStack align="start" marginTop={5}>
      <DroneButton
        text="Takeoff"
        leftIcon={<MdFlightTakeoff />}
        onClick={handleTakeoff}
      />
      <DroneButton
        text="Land"
        leftIcon={<MdFlightLand />}
        onClick={handleLand}
      />
    </VStack>
  );
};

export default FlightButtons;
