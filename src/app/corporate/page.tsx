'use client';

import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Container,
  Button,
  Link,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import {
  FaBriefcase,
  FaBrain,
  FaUsers,
  FaHeartbeat,
  FaEnvelope,
} from 'react-icons/fa';
import HeroSection from '../components/HeroSection';

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
    <Icon as={icon} w={10} h={10} color="teal.500" mb={4} />
    <Heading fontSize="xl" mb={2}>
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);

export default function Corporate() {
  return (
    <Box>
      <HeroSection
        backgroundImage="/office-yoga.avif"
        title="Corporate Yoga"
        subtitle="Bring wellness and balance to your workplace"
      />
      <Container maxW="container.xl" py={16}>
        <VStack spacing={16} align="stretch">
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Our Offerings
            </Heading>
            <Text fontSize="lg" mb={4}>
              We provide flexible options to meet your company's unique needs:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text>• On-site classes</Text>
              <Text>• Virtual sessions</Text>
              <Text>• Workshops and retreats</Text>
            </VStack>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={8}>
              Benefits of Corporate Yoga
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <BenefitCard
                icon={FaBriefcase}
                title="Increased Productivity"
                description="Yoga helps reduce stress and improve focus, leading to higher productivity in the workplace."
              />
              <BenefitCard
                icon={FaBrain}
                title="Enhanced Mental Clarity"
                description="Regular practice improves cognitive function and decision-making skills."
              />
              <BenefitCard
                icon={FaUsers}
                title="Improved Team Dynamics"
                description="Group yoga sessions foster better communication and collaboration among employees."
              />
              <BenefitCard
                icon={FaHeartbeat}
                title="Better Physical Health"
                description="Yoga promotes physical well-being, reducing sick days and healthcare costs."
              />
            </SimpleGrid>
          </Box>

          <Flex
            direction="column"
            align="center"
            bg="teal.500"
            color="white"
            p={8}
            borderRadius="lg"
          >
            <Heading as="h2" size="xl" mb={4}>
              Ready to get started?
            </Heading>
            <Text fontSize="lg" mb={6} textAlign="center">
              Contact us to bring the benefits of yoga to your workplace.
            </Text>
            <Button
              as={Link}
              href="mailto:Colton@downdawgs.com"
              colorScheme="whiteAlpha"
              size="lg"
              leftIcon={<Icon as={FaEnvelope} />}
            >
              Email for Inquiries
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
