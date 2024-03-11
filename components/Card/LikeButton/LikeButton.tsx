'use client';
import { likeButtonProps } from '@/types';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

/**
 * Represents a button for liking a post.
 *
 * @param {Array} heart - An array of objects representing the likes for the post. Each object has properties `id`, `postId`, and `userId`.
 * @param {string} postId - The ID of the post.
 * @param {string} userId - The ID of the user.
 * @returns {JSX.Element} - The rendered button component.
 */
export const LikeButton = ({ heart, postId, userId }: likeButtonProps) => {
	const BASE_URL = process.env.NEXT_PULIC_BASE_URL;
	const [userLiked, setUserLiked] = useState(false);
	const [likeCount] = useState(heart.length);
	const router = useRouter();
	const refreshData = () => {
		router.refresh();
	};

	const sendLike = async () => {
		try {
			await fetch(`https://pulse-social.vercel.app/api/post/likePost`, {
				cache: 'no-store',
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ postId }),
			});
		} catch (error) {
			console.error('Error liking post:', error);
		}
		refreshData();
	};

	useEffect(() => {
		const userHasLiked = heart.some((item) => item.userId === userId);
		setUserLiked(userHasLiked);
	}, [heart, userId]);

	return (
		<button
			className='flex items-center gap-4 px-4 py-2 border-2 border-gray-100 rounded-md'
			onClick={sendLike}
		>
			<span>
				<Heart
					className={` ${
						userLiked || likeCount >= 1 ? 'fill-slate-800 ' : ' fill-white'
					}`}
				/>
			</span>
			<span>
				{likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
			</span>
		</button>
	);
};
