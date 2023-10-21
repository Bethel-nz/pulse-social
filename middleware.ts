export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/protected', '/home', '/profile', '/post/:path*'],
};
