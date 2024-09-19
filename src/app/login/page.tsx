'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { register } from '@/actions/register';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export default function LoginRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isRegistering) {
      const r = await register({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        username: formData.get('username') as string,
      });
      if (r?.error) {
        setError(r.error);
        return;
      }
      // Show success toast
      toast({
        title: 'Registration successful',
        description: 'You have been automatically logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Automatically sign in after successful registration
      await signIn('credentials', {
        username: formData.get('username'),
        password: formData.get('password'),
        redirect: false,
      });
      return router.push('/');
    } else {
      const res = await signIn('credentials', {
        username: formData.get('username'),
        password: formData.get('password'),
        redirect: false,
      });
      if (res?.error) {
        setError(res.error as string);
        return;
      }
      if (res?.ok) {
        return router.push('/');
      }
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          {isRegistering && (
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            {isRegistering ? 'Register' : 'Sign In'}
          </Button>
        </VStack>
      </form>
      <HStack justifyContent="center" mt={4}>
        <Text>
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}
        </Text>
        <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Sign In' : 'Register'}
        </Button>
      </HStack>
    </Box>
  );
}
