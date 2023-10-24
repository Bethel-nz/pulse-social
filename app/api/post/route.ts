import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export const revalidate = 1;
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
		console.log(error);
		return NextResponse.json({ error });
	}
};
