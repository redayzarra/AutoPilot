import { Box, Grid, GridItem } from "@chakra-ui/react";
import Flips from "./components/Flips";
import HeightSlider from "./components/HeightSlider";
import NavBar from "./components/NavBar";
import Camera from "./components/Camera";
import TakeOff from "./components/TakeOff";
import Land from "./components/Land";
import StopButton from "./components/StopButton";

function App() {
  return (
    <Grid
      templateAreas={`"nav nav nav" 
                      "flip main height"`}
      gridTemplateColumns="1fr 3fr 1fr"
    >
      <GridItem area="nav" bg="gray.800">
        <NavBar />
      </GridItem>

      <GridItem
        area="flip"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="gray.800"
      >
        <Box>
          <Flips />
        </Box>
      </GridItem>

      <GridItem area="main" bg="gray.800">
        <Camera />
        <TakeOff />
        <StopButton />
        <Land />
      </GridItem>

      <GridItem area="height" bg="gray.800">
        <HeightSlider />
      </GridItem>
    </Grid>
  );
}

export default App;
