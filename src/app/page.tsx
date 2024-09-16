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
import HeroSection from './components/HeroSection';

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
    <HeroSection
      backgroundImage="/yoga-hero-img.jpg"
      title="Down Dawgs"
      subtitle="Helping men build and maintain a mindfulness practice so they can become the person they were meant to be"
    >
      <Box
        width={{ base: '100%', md: '30%' }}
        alignSelf={{ base: 'center', md: 'flex-end' }}
        mt={{ base: 12, md: 0 }}
        mb={{ base: 8, md: 0 }}
      >
        <Card bg="white" borderRadius="xl">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Stay Updated</Heading>
                <Text>
                  Add your email to stay up to date on our latest offerings and
                  events
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
    </HeroSection>
  );
}
