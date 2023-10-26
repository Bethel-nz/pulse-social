import { Post } from '@/types/type';
import { headers } from 'next/headers';

export const fetchAllPost = async () => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`${BASE_URL}/api/post`, {
		next: { revalidate: 10, tags: ['all-post'] },
	});
	const data: Post[] = await response.json();
	return data;
};
