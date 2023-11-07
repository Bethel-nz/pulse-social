import { NextResponse } from 'next/server';

import prisma from 'prisma/client';

type Params = {
	params: {
		slug: string;
	};
};

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
