import { Post } from '@/types/type';

export const fetchUserProfile = async () => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`${BASE_URL}/api/post/user`);
	const data: Post[] = await response.json();
	console.log(data);

	return data;
};
