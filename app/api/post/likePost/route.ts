import { getServerSession } from 'next-auth';
import prisma from 'prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

/**
 * Handles a POST request to like or unlike a post.
 *
 * @param {Request} req - The request object containing the method and body of the request.
 * @returns {Promise<object>} - The result of the like operation, either the created or deleted heart record.
 */
export const POST = async (req: Request) => {
	const session = await getServerSession(authOptions);
	const email = session!.user?.email;

	const body = await req.json();
	if (!session) {
		return NextResponse.json({
			message: 'You need to sign up to like a post',
		});
	}

	if (!email) return null;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) return null;
	const heart = await prisma.heart.findFirst({
		where: {
			postId: body.postId,
			userId: user.id,
		},
	});
	if (req.method === 'POST') {
		try {
			if (!heart) {
				const result = await prisma.heart.create({
					data: {
						postId: body.postId,
						userId: user.id,
					},
				});
				return NextResponse.json(result, { status: 201 });
			} else {
				const result = await prisma.heart.delete({
					where: {
						id: heart.id,
					},
				});
				return NextResponse.json(result, { status: 200 });
			}
		} catch (error) {
			console.error(error);
			return NextResponse.error();
		}
	}
};
