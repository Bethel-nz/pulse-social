export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/home', '/profile', '/post/[...slug]'],
};
