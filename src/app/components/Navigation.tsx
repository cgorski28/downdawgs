'use client'

import { Flex, Link as ChakraLink, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Navigation() {
  return (
    <Flex as="nav" bg="gray.100" p={4}>
      <NextLink href="/" passHref legacyBehavior>
        <ChakraLink mr={4}>Home</ChakraLink>
      </NextLink>
      <NextLink href="/vinhausa" passHref legacyBehavior>
        <ChakraLink mr={4}>Vinhausa</ChakraLink>
      </NextLink>
      <NextLink href="/corporate" passHref legacyBehavior>
        <ChakraLink mr={4}>Corporate</ChakraLink>
      </NextLink>
      <NextLink href="/mens-club" passHref legacyBehavior>
        <ChakraLink>Men's Club</ChakraLink>
      </NextLink>
      <Spacer />
      {/* Add logo or brand name here */}
    </Flex>
  )
}
