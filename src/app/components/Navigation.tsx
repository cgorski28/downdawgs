'use client';

import { Flex, Link as ChakraLink, Spacer, Box } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navigation() {
  return (
    <Box as="nav" position="fixed" top={0} left={0} right={0} zIndex={10}>
      <Flex bg="gray.800" p={4}>
        <NextLink href="/" passHref legacyBehavior>
          <ChakraLink mr={4} color="white" fontWeight="bold">
            Home
          </ChakraLink>
        </NextLink>
        <NextLink href="/vinhausa" passHref legacyBehavior>
          <ChakraLink mr={4} color="white" fontWeight="bold">
            VinHausa
          </ChakraLink>
        </NextLink>
        <NextLink href="/mens-club" passHref legacyBehavior>
          <ChakraLink mr={4} color="white" fontWeight="bold">
            Men's Club
          </ChakraLink>
        </NextLink>
        <NextLink href="/corporate" passHref legacyBehavior>
          <ChakraLink color="white" fontWeight="bold">
            Corporate
          </ChakraLink>
        </NextLink>
        <Spacer />
        {/* Add logo or brand name here */}
      </Flex>
    </Box>
  );
}
