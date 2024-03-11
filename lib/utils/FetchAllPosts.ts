import { Post } from '@/types';

export const fetchAllPost = async () => {
	const response = await fetch(`https://pulse-social.vercel.app/api/post`, {
		cache: 'no-store',
		next: { revalidate: 1 },
	});
	const data: Promise<Post[]> = await response.json();
	return data;
};
