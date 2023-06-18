import { Box, Checkbox, Text } from "@chakra-ui/react";
import axios from 'axios';
import { useState } from 'react';

const FaceDetection = () => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleFaceDetection = () => {
    const route = isChecked ? "/drone/face_detection/disable" : "/drone/face_detection/enable";
    axios.post(route)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
    setIsChecked(!isChecked);
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" display="inline">
        Facial Recognition: {"   "}
      </Text>
      <Checkbox colorScheme="gray" size='lg' isChecked={isChecked} onChange={toggleFaceDetection} marginTop={1} defaultChecked></Checkbox>
    </Box>
  );
};

export default FaceDetection;
