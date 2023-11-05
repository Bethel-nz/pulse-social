import { NextResponse } from 'next/server';

import prisma from 'prisma/client';

type Params = {
	params: {
		slug: string;
	};
};

/**
 * Handles a GET request and retrieves data from a database using Prisma.
 * @param req - The request object containing information about the HTTP request.
 * @param params - The parameters object containing the `slug` parameter.
 * @returns The retrieved data as a JSON response.
 * If an error occurs during the retrieval process, an error message is returned instead.
 */

export const GET = async (req: Request, { params: { slug } }: Params) => {
	try {
		const data = await prisma.post.findUnique({
			where: {
				id: slug,
			},
			include: {
				user: true,
				hearts: true,
				comments: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						user: true,
					},
				},
			},
		});
		return NextResponse.json(data);
	} catch (err) {
		NextResponse.json({ err: 'Error has occured while making a post' });
	}
};
