import { Grid, GridItem, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Flips from "./components/Flips";

function App() {
  return (
    <Grid
      templateAreas={`"nav nav nav" 
                      "flip camera height"`}
      gridTemplateColumns="1fr 3fr 1fr"
    >
      <GridItem area="nav" bg="blackAlpha.700">
        <NavBar />
      </GridItem>
      <GridItem
        area="flip"
        bg="darkgreen"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Flips />
        </Box>
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
