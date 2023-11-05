import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Retrieves user data and their posts from a database using Prisma.
 * Checks if the user is authenticated using NextAuth and returns the data as a JSON response.
 *
 * @param req - The request object containing information about the HTTP request.
 * @returns The user's data, including their posts and comments, returned as a JSON response.
 *
 * @example
 * const data = await GET(req);
 * console.log(data);
 *
 * Expected output:
 * {
 *   "id": 1,
 *   "name": "John Doe",
 *   "email": "johndoe@email.com",
 *   "posts": [
 *     {
 *       "id": 1,
 *       "title": "First Post",
 *       "content": "Lorem ipsum dolor sit amet",
 *       "comments": [
 *         {
 *           "id": 1,
 *           "text": "Great post!"
 *         },
 *         {
 *           "id": 2,
 *           "text": "I agree!"
 *         }
 *       ]
 *     },
 *     {
 *       "id": 2,
 *       "title": "Second Post",
 *       "content": "Consectetur adipiscing elit",
 *       "comments": []
 *     }
 *   ]
 * }
 */
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(authOptions);
	try {
		if (!session) {
			return NextResponse.json({ message: 'Please Sign-in to create a post.' });
		}
		const email = session && session.user?.email;

		if (!email) {
			return NextResponse.json({ message: 'Email not found in session' });
		}

		const data = await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				posts: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						comments: true,
					},
				},
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(error);
	}
};
