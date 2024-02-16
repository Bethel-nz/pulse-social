import { NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

import prisma from 'prisma/client';

type Data = {
	comment: string;
	postId: string;
};

/**
 * Handles a POST request to create a new comment.
 *
 * @param req - The request object containing the HTTP request information.
 * @param res - The response object used to send the HTTP response.
 * @returns A JSON response with a message indicating the result of the operation.
 * @throws If there is an error during the process.
 *
 * @example
 * // Send a POST request to create a new comment
 * const response = await fetch('/api/post', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     comment: 'Great post!',
 *     postId: '12345',
 *   }),
 * });
 * const data = await response.json();
 * console.log(data);
 * // Output: { message: 'Comment created successfully' }
 */
export const POST = async (req: Request) => {
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
		console.log('[SLUG]:', err);
		return NextResponse.json({ message: err });
	}
};
