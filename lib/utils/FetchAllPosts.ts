import { Post } from '@/types';

export const fetchAllPost = async () => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`https://pulse-social.vercel.app//api/post`, {
		cache: 'no-cache',
		next: { tags: ['all-post'] },
	});
	const data: Promise<Post[]> = await response.json();
	return data;
};
