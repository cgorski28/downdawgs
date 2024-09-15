'use client';

import { Box, Flex, Heading, Text, VStack, Container } from '@chakra-ui/react';

export default function MensClub() {
  return (
    <Flex direction="column" minHeight="calc(100vh - 54px)">
      <Box
        flex="1"
        bgImage="url('/mens-class.webp')"
        bgColor="gray.200"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      >
        <Container maxW="container.xl" height="100%">
          <Flex
            height="100%"
            direction="column"
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
                Men's Club
              </Heading>
              <Text
                fontSize="xl"
                color="white"
                maxWidth={{ base: '100%', md: '80%' }}
                textAlign={{ base: 'center', md: 'left' }}
              >
                Curating a space for men to dive deeper into their own practice
                with other like-minded people.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
