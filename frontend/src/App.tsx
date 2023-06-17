import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import ArrowControls from "./components/ArrowControls";
import Camera from "./components/Camera";
import FlightButtons from "./components/FlightButtons";
import Flips from "./components/Flips";
import Footer from "./components/Footer";
import HeightControls from "./components/HeightControls";
import NavBar from "./components/NavBar";
import StopButton from "./components/StopButton";

function App() {
  return (
    <>
      <Grid
        templateAreas={`"nav nav nav" 
                      "flip main height"`}
        gridTemplateColumns="0.5fr 3fr 0.5fr"
      >
        <GridItem area="nav" bg="gray.800" marginBottom={2}>
          <NavBar />
        </GridItem>

        <GridItem
          area="flip"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          bg="gray.800"
          marginTop="300px"
          marginX={1}
        >
          <Box>
            <Flips />
          </Box>
        </GridItem>

        <GridItem area="main" bg="gray.800">
          <Camera />
          <HStack justifyContent="space-between">
            <FlightButtons />
            <ArrowControls />
            <StopButton />
          </HStack>
        </GridItem>

        <GridItem
          area="height"
          display="flex"
          alignItems="flex-start"
          bg="gray.800"
          marginLeft={5}
          marginTop="300px"
        >
          <Box>
            <HeightControls />
          </Box>
        </GridItem>
      </Grid>

      <HStack justifyContent="center" marginTop="300px" marginBottom={2}>
        <Footer />
      </HStack>
    </>
  );
}

export default App;
