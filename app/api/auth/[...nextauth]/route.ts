import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from 'prisma/client';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'Johndoe@email.com',
				},
				password: {
					label: 'password',
					type: 'password',
					placeholder: 'Pa$5w07d',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (!user) return null;

				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!passwordMatch) return null;
				return user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 14 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
