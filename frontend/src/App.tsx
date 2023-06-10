import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import ArrowControls from "./components/ArrowControls";
import Camera from "./components/Camera";
import FlightButtons from "./components/FlightButtons";
import Flips from "./components/Flips";
import HeightSlider from "./components/HeightSlider";
import NavBar from "./components/NavBar";

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
        alignItems="flex-start"
        bg="gray.800"
        marginTop="135px"
      >
        <Box>
          <Flips />
        </Box>
      </GridItem>

      <GridItem area="main" bg="gray.800">
        <Camera />
        <HStack>
          <FlightButtons />
          <ArrowControls />
        </HStack>
      </GridItem>

      <GridItem area="height" bg="gray.800">
        <HeightSlider />
      </GridItem>
    </Grid>
  );
}

export default App;
