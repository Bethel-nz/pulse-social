import { Post } from '@/types/type';

type UserData = {
	id: string;
	name: string;
	email: string;
	image: string;
	banner: string | null;
	posts: {
		id: string;
		createdAt: string;
		updatedAt: string;
		content: string;
		image: string | null;
		video: string | null;
		published: boolean;
		userId: string;
	}[];
	comments: {
		createdAt: string;
		id: string;
		title: string;
		postId: string;
		userId: string;
		user: {
			id: string;
			name: string;
			email: string;
			password: string;
			image: string;
			banner: string | null;
			role: string;
		};
	}[];
};

export const fetchUserProfile = async (arg: string) => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`${BASE_URL}/api/users/${arg}`);
	const data: UserData = await response.json();
	// Initialize posts array if it doesn't exist
	return data;
};
