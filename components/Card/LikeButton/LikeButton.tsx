'use client';
import { useBaseURL } from '@/hooks/useBaseUrl';
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
export const LikeButton = ({ heart, postId, userId }: likeButtonProps) => {
	const BASE_URL = useBaseURL();
	const [userLiked, setUserLiked] = useState(false);
	const [likeCount] = useState(heart.length);

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
				return;
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const userHasLiked = heart.some((item) => item.userId === userId);
		setUserLiked(userHasLiked);
	}, [heart, userId]);

	return (
		<button
			className='flex gap-4 items-center border-gray-100 border-2 rounded-md py-2 px-4'
			onClick={sendLike}
		>
			<span>
				<Heart
					className={` ${userLiked ? 'fill-slate-800 ' : ' fill-white'}`}
				/>
			</span>
			<span>
				{likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
			</span>
		</button>
	);
};
