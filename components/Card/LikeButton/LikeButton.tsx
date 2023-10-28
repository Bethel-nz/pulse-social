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
	const [processingLike, setProcessingLike] = useState(false);

	const sendLike = async () => {
		const res = await fetch(`${BASE_URL}/api/post/likePost`, {
			cache: 'no-store',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ postId: postId }),
		});
		if (res.ok) {
			setLikeCount((prevCount) => prevCount + 1);
			return;
		} else {
			console.error('something went wrong!');
		}
	};
	const handleClick = () => {
		setUserLiked((prev) => !prev);
		if (!userLiked) {
			setLikeCount(likeCount + 1);
		} else {
			setLikeCount(heart.length);
		}
		sendLike();
	};
	useEffect(() => {
		const userFound = heart.find((like) => like.userId === userId);
		if (userFound) {
			setUserLiked(true);
		} else {
			setUserLiked(false);
		}
	}, [userId, heart, likeCount]);

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
