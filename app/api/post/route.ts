import prisma from '@/prisma/client';
import { revalidateTag } from 'next/cache';
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
		console.log(data);

		revalidateTag('all-post');
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
