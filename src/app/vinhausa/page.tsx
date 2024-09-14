'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  SimpleGrid,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaYinYang, FaDollarSign, FaUsers } from 'react-icons/fa';

type InfoCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const InfoCard = ({ title, description, icon }: InfoCardProps) => (
  <Box
    p={5}
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    bg="white"
    opacity={0.9}
    transition="all 0.3s"
    _hover={{
      transform: 'translateY(-5px)',
      shadow: 'lg',
      opacity: 1,
    }}
  >
    <Icon as={icon} w={10} h={10} color="teal.500" mb={4} />
    <Heading fontSize="xl" mb={2}>
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);

export default function Vinhausa() {
  return (
    <Box>
      {/* Hero Section */}
      <Flex
        height="calc(100vh - 54px)"
        backgroundImage="url('/yogainthepark.jpg')"
        backgroundSize="cover"
        backgroundPosition="center 65%"
        backgroundRepeat="no-repeat"
        alignItems="flex-start" // Changed from center to flex-start
        justifyContent="center"
        pt={20} // Added top padding
      >
        <VStack
          spacing={4}
          align="center"
          p={8}
          color="white" // Changed text color to white
          textShadow="0 0 8px rgba(0,0,0,0.6)" // Added text shadow for better visibility
        >
          <Heading as="h1" size="2xl">
            VinHausa
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Explore our unique yoga experience in the heart of Chicago
          </Text>
        </VStack>
      </Flex>

      {/* Content below the fold */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Text fontSize="lg" p={6} borderRadius="md" bg="gray.50">
            VinHausa is a play on words, combining "Vinyasa" (from Sanskrit: vi,
            "in a special way," and nyasa, "to place") with "House" music. We
            place yoga in non-traditional settings, bringing it outside to the
            middle of Chicago with a DJ playing house music.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <InfoCard
              title="Breaking Barriers"
              description="VinHausa is completely free. We removed the price to make getting out of your comfort zone easier."
              icon={FaDollarSign}
            />
            <InfoCard
              title="Challenging Stigmas"
              description="Yoga looks beyond gender. This space is for everyone to dive deeper into their practice, not just women."
              icon={FaUsers}
            />
            <InfoCard
              title="Unique Experience"
              description="Practice yoga in a special way, outdoors in Chicago with house music, breaking traditional boundaries."
              icon={FaYinYang}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
