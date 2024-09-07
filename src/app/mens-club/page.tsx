'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export default function MensClub() {
  return (
    <Box minHeight="100vh" p={8}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">
          Weekly Men's Club
        </Heading>
        <Text fontSize="xl">Join our exclusive men's yoga sessions</Text>
        {/* Add more content here */}
      </VStack>
    </Box>
  );
}
