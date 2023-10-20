import { ReactNode } from 'react';

export type Props = {
	children: ReactNode;
};

export type Post = {
	id: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	image: string;
	video: string;
	published: boolean;
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
	comments: string[];
	hearts: string[];
};
