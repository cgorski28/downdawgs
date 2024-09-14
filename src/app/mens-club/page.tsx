'use client';

import { Box, Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';

export default function MensClub() {
  return (
    <Flex direction="column" height="calc(100vh - 54px)">
      <Box
        flex="1"
        bgImage="url('/mens-class.webp')"
        bgColor="gray.200"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      >
        <Container maxW="container.xl" height="100%">
          <Flex
            height="100%"
            direction="column"
            justifyContent="flex-start"
            pt="20%"
          >
            <VStack spacing={6} align="flex-start" width="50%" mb={16}>
              <Heading
                as="h1"
                size="4xl"
                lineHeight="1.2"
                color="white"
                fontWeight="bold"
              >
                Men's Club
              </Heading>
              <Text fontSize="xl" color="white" maxWidth="80%">
                Curating a space for men to dive deeper into their own practice
                with other like-minded people.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
