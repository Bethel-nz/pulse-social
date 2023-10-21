export { default } from 'next-auth/middleware';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest, NextResponse as Response } from 'next/server';
import { authOptions } from './app/api/auth/[...nextauth]/route';

export async function middleware(request: NextRequest, response: Response) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.redirect('/login');
}

export const config = {
	matcher: [
		'/protected',
		'/home',
		'/profile',
		'/post/:path*',
		'/api/:function*',
	],
};
