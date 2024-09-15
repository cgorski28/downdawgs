'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Container,
  Button,
  Input,
  useToast,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

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
    <Flex direction="column" minHeight="calc(100vh - 54px)">
      <Box
        flex="1"
        bgImage="url('/yoga-hero-img.jpg')"
        bgColor="gray.200"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      >
        <Container maxW="container.xl" height="100%">
          <Flex
            height="100%"
            direction={{ base: 'column', md: 'column' }}
            justifyContent={{ base: 'flex-start', md: 'flex-start' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            pt={{ base: '30vh', md: '20%' }}
            px={{ base: 4, md: 0 }}
          >
            <VStack
              spacing={{ base: 10, md: 6 }}
              align={{ base: 'center', md: 'flex-start' }}
              width={{ base: '100%', md: '50%' }}
              mb={{ base: 16, md: 16 }}
            >
              <Heading
                as="h1"
                size={{ base: '3xl', md: '4xl' }}
                lineHeight="1.2"
                color="white"
                fontWeight="bold"
                textAlign={{ base: 'center', md: 'left' }}
              >
                Down Dawgs
              </Heading>
              <Text
                fontSize="xl"
                color="white"
                maxWidth={{ base: '100%', md: '80%' }}
                textAlign={{ base: 'center', md: 'left' }}
              >
                Helping men build and maintain a mindfulness practice so they
                can become the person they were meant to be
              </Text>
            </VStack>

            <Box
              width={{ base: '100%', md: '30%' }}
              alignSelf={{ base: 'center', md: 'flex-end' }}
              mt={{ base: 12, md: 0 }}
              mb={{ base: 8, md: 0 }} // Add bottom margin for mobile
            >
              <Card bg="white" borderRadius="xl">
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                      <Heading size="md">Stay Updated</Heading>
                      <Text>
                        Add your email to stay up to date on our latest
                        offerings and events
                      </Text>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <EmailIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          required
                        />
                      </InputGroup>
                      <Button
                        type="submit"
                        colorScheme="blackAlpha"
                        size="lg"
                        width="100%"
                      >
                        Join
                      </Button>
                    </VStack>
                  </form>
                </CardBody>
              </Card>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
