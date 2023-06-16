import { Divider, VStack, HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <VStack width="100%">
      <Divider orientation="horizontal" />
      <HStack>
        <Text color="gray.400">Copyright (c) 2023 ReDay Zarra </Text>
      </HStack>
    </VStack>
  );
};

export default Footer;
