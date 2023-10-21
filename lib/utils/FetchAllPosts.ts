import { Post } from '@/types/type';
import { BASE_URL } from '../lib';

export const fetchAllPost = async () => {
	const response = await fetch(`http://${BASE_URL}/api/post`, {
		next: { revalidate: 600 },
	});
	const data = await response.json();
	console.log(data);
	return data as Promise<Post[]>;
};
