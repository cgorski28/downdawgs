'use client'


import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export default function Vinhausa() {
  return (
    <Box minHeight="100vh" p={8}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">Vinhausa</Heading>
        <Text fontSize="xl">Explore our Vinhausa yoga offerings</Text>
        {/* Add more content here */}
      </VStack>
    </Box>
  );
}