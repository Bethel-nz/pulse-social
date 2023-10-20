import { Post } from '@/types/type';

export const fetchAllPost = async () => {
	const response = await fetch('http://localhost:3000/api/post', {
		next: { revalidate: 60 },
	});
	const data = await response.json();
	return data as Promise<Post[]>;
};