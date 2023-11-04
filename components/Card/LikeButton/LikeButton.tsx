'use client';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
	const userHasLiked = heart.some((item) => item.userId === userId);
	const [userLiked, setUserLiked] = useState(userHasLiked);
	const [likeCount, setLikeCount] = useState(heart.length);

	// Function to update likes on the server
	const sendLike = async () => {
		const res = await fetch(`${BASE_URL}/api/post/likePost`, {
			cache: 'no-store',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ postId: postId }),
		});
		try {
			if (res.ok) {
				if (userLiked) {
					setLikeCount((prev) => prev - 1);
					setUserLiked(false);
				} else {
					// If user didn't like before, increment count by 1 and toggle userLiked
					setLikeCount((prev) => prev + 1);
					setUserLiked(true);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Function to handle user's click on the like button
	const handleClick = async () => {
		await sendLike();
	};

	return (
		<button
			className='flex gap-4 items-center border-gray-100 border-2 rounded-md py-2 px-4'
			onClick={handleClick}
		>
			<span>
				<Heart className={`${userLiked ? 'fill-slate-800' : 'fill-white'}`} />
			</span>
			<span>{likeCount <= 1 ? `${likeCount} like` : `${likeCount} likes`}</span>
		</button>
	);
};
