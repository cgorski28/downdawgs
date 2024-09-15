'use client';

import {
  Flex,
  Link as ChakraLink,
  Spacer,
  Box,
  IconButton,
  VStack,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function Navigation() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box as="nav" position="fixed" top={0} left={0} right={0} zIndex={10}>
      <Flex bg="gray.800" p={4} align="center">
        {/* Hamburger menu for mobile */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Toggle Navigation"
          color="white"
        />

        {/* Desktop menu */}
        <Flex display={{ base: 'none', md: 'flex' }}>
          <NavLinks />
        </Flex>

        <Spacer />
        {/* Add logo or brand name here */}
      </Flex>

      {/* Mobile menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box bg="gray.800" p={4} display={{ md: 'none' }}>
          <VStack align="start" spacing={4}>
            <NavLinks closeMenu={onClose} />
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

function NavLinks({ closeMenu }: { closeMenu?: () => void }) {
  return (
    <>
      <NextLink href="/" passHref legacyBehavior>
        <ChakraLink mr={4} color="white" fontWeight="bold" onClick={closeMenu}>
          Home
        </ChakraLink>
      </NextLink>
      <NextLink href="/vinhausa" passHref legacyBehavior>
        <ChakraLink mr={4} color="white" fontWeight="bold" onClick={closeMenu}>
          VinHausa
        </ChakraLink>
      </NextLink>
      <NextLink href="/mens-club" passHref legacyBehavior>
        <ChakraLink mr={4} color="white" fontWeight="bold" onClick={closeMenu}>
          Men's Club
        </ChakraLink>
      </NextLink>
      <NextLink href="/corporate" passHref legacyBehavior>
        <ChakraLink color="white" fontWeight="bold" onClick={closeMenu}>
          Corporate
        </ChakraLink>
      </NextLink>
    </>
  );
}
