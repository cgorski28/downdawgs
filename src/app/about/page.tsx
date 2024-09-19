import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import HeroSection from '../components/HeroSection';
import Calendar from '../components/Calendar';

const AboutPage = () => {
  return (
    <Box minHeight="100vh">
      <HeroSection
        backgroundImage="/yoga-hero-img.jpg"
        title="About"
        subtitle="Discover our mission and meet your instructor"
      />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="lg" mb={4}>
              Our Mission
            </Heading>
            <Text>
              At Down Dawgs, we're passionate about bringing the joy and
              benefits of yoga to everyone, especially those who might feel
              intimidated by traditional yoga settings. Our mission is to create
              a welcoming, fun, and inclusive environment where people of all
              backgrounds and fitness levels can experience the transformative
              power of yoga.
            </Text>
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="lg" mb={4}>
              Meet Your Instructor: Colton
            </Heading>
            <Text mb={4}>
              Colton is the heart and soul of Down Dawgs. With over a decade of
              experience in yoga practice and teaching, Colton brings a unique
              blend of expertise, enthusiasm, and approachability to every
              class. His journey in yoga began as a way to balance the demands
              of a high-stress job, and it quickly became a passion that he
              wanted to share with others.
            </Text>
            <Text>
              Colton's teaching style emphasizes accessibility, proper
              alignment, and the mind-body connection. He believes that yoga is
              for everybody and every body, and he's committed to helping each
              student discover their own path in yoga.
            </Text>
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="lg" mb={4}>
              Why Choose Down Dawgs?
            </Heading>
            <UnorderedList spacing={2}>
              <ListItem>
                Inclusive and welcoming environment for all skill levels
              </ListItem>
              <ListItem>Expert instruction from experienced teachers</ListItem>
              <ListItem>Focus on proper alignment and safety</ListItem>
              <ListItem>
                Variety of class styles to suit different needs and preferences
              </ListItem>
              <ListItem>Community-oriented approach to wellness</ListItem>
            </UnorderedList>
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="lg" mb={4}>
              Upcoming Classes
            </Heading>
            <Calendar />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;
