import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

/**
 * Handles a POST request to create a new user.
 *
 * @param req - The request object containing the user data in the request body.
 * @returns A JSON response with the created user's data or an error message.
 */
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, email, password, image } = body;
		const hashPassword: string = await hash(password, 10);
		const exists = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (exists) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 400 }
			);
		}
		const user = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: hashPassword,
				image: image,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(error);
	}
}
