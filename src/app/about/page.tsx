'use client';
import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import HeroSection from '../components/HeroSection';
import Calendar from '../components/Calendar';
import { EventDocument } from '@/models/Event';
import { useSession } from 'next-auth/react';
const AboutPage = () => {
  const [events, setEvents] = useState<EventDocument[]>([]);
  const { data: session } = useSession();

  const fetchEvents = useCallback(async (year: number, month: number) => {
    try {
      const response = await fetch(`/api/event?year=${year}&month=${month}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  const addEvent = async (
    eventData: Omit<EventDocument, '_id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      const data = await response.json();
      // Refresh events after adding a new one
      fetchEvents(new Date().getFullYear(), new Date().getMonth() + 1);
      return data;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  return (
    <Box minHeight="100vh">
      <HeroSection
        backgroundImage="/yoga-hero-img.jpg"
        title="About DownDawgs"
        subtitle="Empowering men through yoga and mindfulness"
      />
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1.2fr' }} gap={8}>
            <GridItem>
              <Heading as="h2" size="xl" mb={4}>
                Meet Colton
              </Heading>
              <Text fontSize="lg" mb={4}>
                Colton's yoga journey began during the COVID pandemic as a way
                to transition from work to home life. What started as online
                classes soon became a tool for working through injuries and
                managing stress from his consulting job.
              </Text>
              <Text fontSize="lg">
                In 2022, a move to Chicago and a 200-hour Yoga Teacher training
                became a transformative experience, helping Colton process
                emotions and grow personally after a significant life change.
              </Text>
            </GridItem>
            <GridItem display="flex" justifyContent="flex-end">
              <Image
                src="/track.jpg"
                alt="Colton practicing yoga"
                borderRadius="lg"
                objectFit="cover"
                objectPosition="70% center" // Adjust this value as needed
                width="500px"
                height="400px"
              />
            </GridItem>
          </Grid>

          <Box bg="gray.50" borderRadius="xl" p={8}>
            <Heading as="h2" size="xl" mb={6}>
              The Birth of DownDawgs
            </Heading>
            <Text fontSize="lg" mb={4}>
              Colton's "Ah-Ha" moment came when he found himself the only man in
              a yoga class as Shania Twain's "Feel Like a Woman" played. This
              experience highlighted two key issues:
            </Text>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              <GridItem bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h3" size="md" mb={3}>
                  1. Lack of Male-Focused Spaces
                </Heading>
                <Text>
                  While great workshops and classes exist, they are few and far
                  between, with little to no male voice in the yoga and
                  mindfulness community.
                </Text>
              </GridItem>
              <GridItem bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h3" size="md" mb={3}>
                  2. Stigma Around Yoga
                </Heading>
                <Text>
                  Many men recognize the benefits of yoga but hesitate due to
                  misconceptions: "I'm not flexible enough," "It's just
                  stretching," "It's girly," and so on.
                </Text>
              </GridItem>
            </Grid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Our Vision
            </Heading>
            <Text fontSize="xl" fontWeight="medium" mb={4}>
              DownDawgs is about more than breaking the stigma around yoga. We
              aim to shift the paradigm of masculinity.
            </Text>
            <Text fontSize="lg">
              To achieve something you've never done, you must become someone
              you've never been. This requires letting go of who you once were.
              DownDawgs empowers men with tools and skills to let go, enabling
              them to step forward into the person they were meant to be.
            </Text>
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="lg" mb={4}>
              Join Our Community
            </Heading>
            <Calendar
              events={events}
              fetchEvents={fetchEvents}
              addEvent={addEvent}
              isSignedIn={!!session?.user?.email}
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;
