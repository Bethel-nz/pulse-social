import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

type Params = {
	params: {
		user: string;
	};
};

export const GET = async (req: Request, { params: { user } }: Params) => {
	try {
		const data = await prisma.user.findFirst({
			where: {
				name: user,
			},
			include: {
				posts: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						hearts: true,
						comments: true,
					},
				},
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ message: 'user not found' });
	}
};
