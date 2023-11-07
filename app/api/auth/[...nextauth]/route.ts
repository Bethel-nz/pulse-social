import NextAuth from 'next-auth/next';
import { NextResponse } from 'next/server';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import prisma from 'prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

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
				if (!user) {
					return NextResponse.json({ message: 'User not found' }) && null;
				}

				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!passwordMatch) return null;

				return (
					NextResponse.json({ message: `welcome back ${user.name}` }) && user
				);
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
		signIn: '/auth/login',
		newUser: '/auth/register',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// hiwonip850@locawin.comX
