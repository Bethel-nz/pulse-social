'use client';
import { Post } from '@/types/type';
import { Heart } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

type heart = {
	id: string;
	postId: string;
	userId: string;
};
type likeButtonProps = {
	heart: heart[];
	postId: string;
	userId: string;
};
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const LikeButton = ({ heart, postId, userId }: likeButtonProps) => {
	const [userLiked, setUserLiked] = useState(false);
	// const [userHeart, setUserHeart] = useState<Post | null>(null);

	// const fetchUserLikes = useCallback(async () => {
	// 	const res = await fetch(`${BASE_URL}/api/post`, {
	// 		next: { revalidate: 1, tags: ['all-post'] },
	// 		cache: 'no-cache',
	// 	});
	// 	const result = await res.json();
	// 	setUserHeart(result);
	// }, [BASE_URL]);

	const handleClick = useCallback(async () => {
		const res = await fetch(`${BASE_URL}/api/post/likePost`, {
			cache: 'no-store',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ postId: postId }),
		});
		setUserLiked((prev) => !prev);
		if (res.ok) {
			return;
		} else {
			console.error('something went wrong!');
		}
		revalidatePath('/home');
	}, [postId]);

	const findUser = useCallback(
		(userId: string) => {
			return heart.find((like) => like.userId === userId);
		},
		[heart]
	);

	useEffect(() => {
		const userFound = findUser(userId);
		setUserLiked(!!userFound);
	}, [findUser, userId, heart]);

	return (
		<button
			className='flex gap-4 items-center border-gray-100 border-2 rounded-md py-2 px-4'
			onClick={handleClick}
		>
			<span>
				<Heart
					className={`border-transparent outline-none ${
						userLiked ? ' fill-pink-500' : 'bg-white fill-white'
					}`}
				/>
			</span>
			{heart.length === 0 ? `0 likes` : `${heart.length} likes`}
		</button>
	);
};
