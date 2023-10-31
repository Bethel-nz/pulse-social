import { Post } from '@/types/type';

export const fetchAllPost = async () => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`${BASE_URL}/api/post`, {
		cache: 'no-store',
		next: { tags: ['all-post'] },
	});
	const data: Post[] = await response.json();
	return data;
};
