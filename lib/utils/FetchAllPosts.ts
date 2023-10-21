import { Post } from '@/types/type';
import { BASE_URL } from '../lib';

export const fetchAllPost = async () => {
	const response = await fetch(`http://${BASE_URL}/api/post`, {
		cache: 'no-store',
	});
	const data = await response.json();
	return data as Promise<Post[]>;
};
