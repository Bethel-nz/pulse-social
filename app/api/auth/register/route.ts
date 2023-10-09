import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password } = body;
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
		} else {
			const user = await prisma.user.create({
				data: {
					email: email,
					password: hashPassword,
					role: 'ADMIN',
				},
			});
			return NextResponse.json(user);
		}
	} catch (error) {
		console.error(error);
	}
}
