import prisma from '@/prisma/client';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Retrieves data from a database using Prisma.
 * Includes the user, comments, and hearts related to each post.
 * Orders the posts by their creation date.
 * Revalidates the cache with the tag 'all-post'.
 * Returns the retrieved data as a JSON response.
 *
 * @param req - The request object containing information about the HTTP request.
 * @returns The retrieved data from the database as a JSON response.
 */
export const GET = async (req: Request) => {
	try {
		const data = await prisma?.post.findMany({
			include: {
				user: true,
				comments: true,
				hearts: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		revalidateTag('all-post');
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
};

export const dynamic = 'force-dynamic';
