'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Button,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Box minHeight="100vh">
      {/* Hero section */}
      <Box
        height="80vh"
        bgImage="url('/yoga-hero-img.jpg')" // Replace with your image path
        bgColor="gray.200" // Fallback color
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Container maxW="container.xl" height="100%">
          <VStack
            spacing={6}
            align="flex-start"
            justify="center"
            height="100%"
            maxWidth="600px"
          >
            <Heading as="h1" size="3xl" lineHeight="1.2" color="white">
              Discover Inner Peace at Down Dawgs
            </Heading>
            <Text fontSize="xl" color="white">
              Embark on a transformative journey through yoga and meditation for
              self-discovery and balance
            </Text>
            <Button colorScheme="teal" size="lg">
              Get Started
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
