import React from 'react';
import Image from 'next/image';
import { Box, Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  backgroundPosition?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  children,
  backgroundPosition = 'center',
}) => {
  return (
    <Flex direction="column" minHeight="calc(100vh - 54px)">
      <Box flex="1" position="relative" overflow="hidden">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition={backgroundPosition}
          priority
          quality={75}
        />
        <Container
          maxW="container.xl"
          height="100%"
          position="relative"
          zIndex={1}
        >
          <Flex
            height="100%"
            direction={{ base: 'column', md: 'column' }}
            justifyContent={{ base: 'flex-start', md: 'flex-start' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            pt={{ base: '30vh', md: '20%' }}
            px={{ base: 4, md: 0 }}
          >
            <VStack
              spacing={{ base: 8, md: 6 }}
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
                {title}
              </Heading>
              <Text
                fontSize="xl"
                color="white"
                maxWidth={{ base: '100%', md: '80%' }}
                textAlign={{ base: 'center', md: 'left' }}
              >
                {subtitle}
              </Text>
            </VStack>
            {children}
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
};

export default HeroSection;
