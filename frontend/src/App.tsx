import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Flips from "./components/Flips";

function App() {
  return (
    <Grid
      templateAreas={`"nav nav nav" 
                      "flip camera height"`}
    >
      <GridItem area="nav" bg="blackAlpha.700">
        <NavBar />
      </GridItem>
      <GridItem area="flip" bg="darkgreen">
        <Flips />
      </GridItem>
      <GridItem area="camera" bg="gold">
        Camera
      </GridItem>
      <GridItem area="height" bg="green">
        Height
      </GridItem>
    </Grid>
  );
}

export default App;
