'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Link,
  SimpleGrid,
  Icon,
  Flex,
} from '@chakra-ui/react';
import {
  FaBriefcase,
  FaBrain,
  FaUsers,
  FaHeartbeat,
  FaEnvelope,
} from 'react-icons/fa';

type BenefitCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <Box
    borderWidth={1}
    borderRadius="lg"
    p={6}
    textAlign="center"
    boxShadow="md"
  >
    <Icon as={icon} w={10} h={10} color="teal.500" mb={4} />
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);

export default function Corporate() {
  return (
    <Box minHeight="100vh" p={8} bg="gray.50">
      <VStack spacing={12} align="center">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Corporate Yoga
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Bring wellness and balance to your workplace
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxWidth="900px">
          <BenefitCard
            icon={FaBriefcase}
            title="Reduce Workplace Stress"
            description="Help employees manage stress and improve overall well-being."
          />
          <BenefitCard
            icon={FaBrain}
            title="Improve Focus"
            description="Enhance employee concentration and productivity."
          />
          <BenefitCard
            icon={FaUsers}
            title="Team Building"
            description="Foster a sense of community and improve team dynamics."
          />
          <BenefitCard
            icon={FaHeartbeat}
            title="Promote Health"
            description="Encourage a healthy lifestyle among your staff."
          />
        </SimpleGrid>

        <Box
          bg="white"
          borderRadius="lg"
          p={8}
          boxShadow="lg"
          maxWidth="600px"
          width="100%"
        >
          <Heading as="h2" size="lg" mb={4}>
            Our Offerings
          </Heading>
          <Text mb={4}>
            We provide flexible options to meet your company's unique needs:
          </Text>
          <VStack align="start" spacing={2} pl={4}>
            <Text>• On-site classes</Text>
            <Text>• Virtual sessions</Text>
            <Text>• Workshops and retreats</Text>
          </VStack>
        </Box>

        <Flex
          direction="column"
          align="center"
          bg="teal.500"
          color="white"
          p={8}
          borderRadius="lg"
          maxWidth="600px"
          width="100%"
        >
          <Heading as="h2" size="lg" mb={4}>
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
            leftIcon={<FaEnvelope />}
          >
            Email for Inquiries
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
