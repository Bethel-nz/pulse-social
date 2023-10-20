import { Post } from '@/types/type';

export const fetchAllPost = async () => {
	const response = await fetch('http://localhost:3000/api/post', {
		cache: 'no-store',
		next: { tags: ['allpost'] },
	});
	const data = await response.json();
	return data as Promise<Post[]>;
};
