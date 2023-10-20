import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

import prisma from 'prisma/client';

type Data = {
	post: string;
	imageUrl?: string;
	videoUrl?: string;
	userId?: string;
};

export const POST = async (req: Request, res: Response) => {
	const session = await getServerSession(authOptions);
	try {
		const data: Data = await req.json();
		const { post, imageUrl, videoUrl } = data;
		const email = session && session.user?.email;

		if (!session) {
			return NextResponse.json({ message: 'You must be sign in' });
		}

		if (post.length <= 4) {
			return NextResponse.json({
				message: 'You should have at least 4 characters',
			});
		}

		if (!email) {
			return NextResponse.json({ message: 'Email not found in session' });
		}

		console.log(email);
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) return null;
		console.log({ data });
		const result = await prisma?.post.create({
			data: {
				content: post,
				video: videoUrl,
				image: imageUrl,
				userId: user.id,
			},
		});
		return NextResponse.json({ message: result });
	} catch (err) {
		return NextResponse.json({ message: err });
	}
};
