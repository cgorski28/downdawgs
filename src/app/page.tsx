'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box minHeight="100vh" p={8}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">Welcome to Down Dawgs</Heading>
        <Text fontSize="xl">Your ultimate destination for yoga and wellness</Text>
        {/* Add more content here */}
      </VStack>
    </Box>
  );
}
