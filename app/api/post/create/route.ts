import { NextResponse } from 'next/server';

type data = {
	post: string;
	imageUrl?: string;
	videoUrl?: string;
};
export const POST = async (req: Request) => {
	try {
		const data: Promise<data> = await req.json();
		console.log(`${(await data).post}`);
		return NextResponse.json({ status: 'Data recieved' });
	} catch (err) {
		console.log(err);
	}
};
