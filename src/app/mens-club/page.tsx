'use client';

import { Box, Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';
import HeroSection from '../components/HeroSection';

export default function MensClub() {
  return (
    <HeroSection
      backgroundImage="/mens-class.webp"
      title="Men's Club"
      subtitle="Curating a space for men to dive deeper into their own practice with other like-minded people."
    />
  );
}
