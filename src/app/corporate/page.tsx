'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export default function Corporate() {
  return (
    <Box minHeight="100vh" p={8}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">
          Corporate Yoga
        </Heading>
        <Text fontSize="xl">Bring wellness to your workplace</Text>
        {/* Add more content here */}
      </VStack>
    </Box>
  );
}
