import { connectDB } from '@/lib/mongodb';
import type { NextAuthOptions } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          username: credentials?.username,
        }).select('+password');

        if (!user) throw new Error('wrong username');

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error('Wrong Password');
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};
