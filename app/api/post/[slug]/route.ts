import { NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

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
		console.log(data, slug);
		return NextResponse.json(data);
	} catch (err) {
		NextResponse.json({ err: 'Error has occured while making a post' });
	}
};

type Data = {
	comment: string;
	postId: string;
};

export const POST = async (req: Request, res: Response) => {
	const session = await getServerSession(authOptions);
	try {
		const data: Data = await req.json();
		const { comment, postId } = data;
		const email = session && session.user?.email;

		if (!session) {
			return NextResponse.json({ message: 'You must be sign in' });
		}

		if (!email) {
			return NextResponse.json({ message: 'Email not found in session' });
		}
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) return null;
		const result = await prisma?.comment.create({
			data: {
				title: comment,
				userId: user.id,
				postId,
			},
		});
		return NextResponse.json({ message: result });
	} catch (err) {
		return NextResponse.json({ message: err });
	}
};
