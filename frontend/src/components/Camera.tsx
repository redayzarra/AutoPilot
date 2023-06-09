import { Box } from "@chakra-ui/react";

const Camera = () => {
  const videoSrc = "http://localhost:5000/drone/camera"; 

  return (
    <Box
      bg="black"
      height="750px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img 
        src={videoSrc} 
        alt="Drone Camera Feed" 
        style={{ height: "100%", width: "auto" }} 
      />
    </Box>
  );
};

export default Camera;
