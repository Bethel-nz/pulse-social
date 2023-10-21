import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
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
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
