import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";

function HeightSlider() {
  const [sliderValue, setSliderValue] = React.useState(0);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const minVal = -100;
  const maxVal = 100;

  return (
    <>
      <Text marginLeft={12} marginBottom={2} fontWeight="bold">
        Height
      </Text>
      <Box
        width="85px"
        borderRadius="lg"
        border="2px"
        borderColor="whiteAlpha.300"
        p="20px"
        marginLeft={8}
      >
        <Slider
          id="slider"
          defaultValue={0}
          min={minVal}
          max={maxVal}
          colorScheme="teal"
          onChange={(v) => setSliderValue(v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          orientation="vertical"
          height="320px"
          marginTop={2}
        >
          <SliderMark value={minVal - 3} ml="12px" fontWeight="bold">
            {minVal}
          </SliderMark>
          <SliderMark value={-5} ml="12px" fontWeight="bold">
            0
          </SliderMark>
          <SliderMark value={maxVal - 7} ml="12px" fontWeight="bold">
            {maxVal}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="left"
            isOpen={showTooltip}
            label={sliderValue}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
    </>
  );
}

export default HeightSlider;
