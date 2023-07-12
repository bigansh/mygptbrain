"use client";

import {
  Heading,
  Text,
  Flex,
  Button,
  useColorMode,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex>
      <Heading color="brand.900">Home [This is a landing page.]</Heading>
      <Box bg="blue.500" opacity="50%" height={20} w={20}></Box>

      <Text>3frgthyju4hntbgrvfd</Text>
      <Button onClick={toggleColorMode}>Toggle Theme</Button>
    </Flex>
  );
}
