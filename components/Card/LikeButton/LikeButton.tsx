'use client';
import { Heart } from 'lucide-react';
import { revalidatePath, revalidateTag } from 'next/cache';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
	const [likeCount, setLikeCount] = useState(heart.length);
	const [hasClicked, setHasClicked] = useState(false);

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
				return console.log(`${postId} has been clicked`);
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleClick = async () => {
		if (!userLiked) {
			setUserLiked(true);
			setLikeCount((prev) => prev + 1);
			setHasClicked(true);
		} else {
			setUserLiked(false);
			setLikeCount((prev) => prev - 1);
			setHasClicked(false);
		}
		await sendLike();
	};

	useEffect(() => {
		const userFound = heart.find((like) => like.userId === userId);
		if (userFound) {
			if (!hasClicked) {
				setUserLiked(true);
			}
		} else {
			return setHasClicked(false);
		}
	}, [userId, heart, likeCount, hasClicked]);

	return (
		<button
			className='flex gap-4 items-center border-gray-100 border-2 rounded-md py-2 px-4'
			onClick={handleClick}
		>
			<span>
				<Heart
					className={`border-transparent outline-none ${
						userLiked ? 'fill-pink-500 ' : ' fill-white'
					}`}
				/>
			</span>
			{likeCount} likes
		</button>
	);
};
