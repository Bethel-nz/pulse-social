import { Post } from '@/types/type';
import { headers } from 'next/headers';

export const fetchAllPost = async () => {
	const BASE_URL = headers().get('Host');
	const response = await fetch(`http://${BASE_URL}/api/post`, {
		next: { tags: ['new post'] },
		cache: 'no-store',
	});
	const data: Post[] = await response.json();
	return data;
};
