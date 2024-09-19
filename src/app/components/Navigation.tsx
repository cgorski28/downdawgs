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
  Button,
  Spinner,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === 'authenticated') {
      return (
        <Button
          variant="solid"
          bg="white"
          color="gray.800"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push('/');
            });
          }}
        >
          Sign Out
        </Button>
      );
    } else if (status === 'loading') {
      return <Spinner color="white" size="sm" />;
    } else {
      return (
        <NextLink href="/login" passHref legacyBehavior>
          <Button as={ChakraLink} variant="solid" bg="white" color="gray.800">
            Sign In
          </Button>
        </NextLink>
      );
    }
  };

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
        {/* Session status on the right side */}
        <Box>{showSession()}</Box>
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
        <ChakraLink mr={4} color="white" fontWeight="bold" onClick={closeMenu}>
          Corporate
        </ChakraLink>
      </NextLink>
      <NextLink href="/about" passHref legacyBehavior>
        <ChakraLink color="white" fontWeight="bold" onClick={closeMenu}>
          About
        </ChakraLink>
      </NextLink>
    </>
  );
}
