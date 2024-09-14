'use client';

import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';

export default function Home() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: 'Subscribed!',
          description: "You've been added to our mailing list.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to subscribe. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh">
      {/* Hero section */}
      <Box
        height="80vh"
        bgImage="url('/yoga-hero-img.jpg')"
        bgColor="gray.200"
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
              Down Dawgs
            </Heading>
            <Text fontSize="xl" color="white">
              Help men build and maintain a mindfulness practice so they can
              become the person they were meant to be
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="email" color="white">
                  Subscribe to our newsletter
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  bg="white"
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" mt={4}>
                Subscribe
              </Button>
            </form>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
