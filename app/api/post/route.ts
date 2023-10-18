import { NextResponse } from 'next/server';
export const GET = async (req: Request) => {
	const post = req.body;
	console.log(post);
};
