import { ReactNode } from 'react';

export type Props = {
	children: ReactNode;
};

type heart = {
	id: string;
	postId: string;
	userId: string;
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
	hearts: heart[];
};

export type UserData = {
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

export type staggerProps = {
	index: number;
} & Props;

export type UserProfileprops = {
	src: string;
	username: string;
	size?: string;
};

export type ImageViewprops = {
	src: string;
	alt: string;
};

export type likeButtonProps = {
	heart: heart[];
	postId: string;
	userId: string;
};

export type renderViewprops = {
	preview: string;
	onClickHandler: () => string;
	type: string;
};
