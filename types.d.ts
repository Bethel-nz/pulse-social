import { ReactNode } from 'react';

export type Props = {
	children: ReactNode;
};

type comments = {
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
};
type user = {
	id: string;
	name: string;
	email: string;
	password: string;
	image: string;
	banner: string | null;
	role: string;
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
	user: User;
	comments: comments[];
	hearts: heart[];
};

type PostWithoutComment = Omit<
	Post,
	'comments' | 'published' | 'hearts' | 'user'
>;

export type UserData = {
	id: string;
	name: string;
	email: string;
	image: string;
	banner: string | null;
	posts: PostWithoutComment[];
	comments: comments[];
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
