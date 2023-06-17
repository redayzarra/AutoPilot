import { Box } from "@chakra-ui/react";

const Camera = () => {
  const videoSrc = "http://localhost:5000/drone/camera"; 

  return (
    <Box
      height="410px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img 
        src={videoSrc} 
        alt="Drone Camera Feed" 
        style={{ width: "100%", height: "auto" }} 
      />
    </Box>
  );
};

export default Camera;
