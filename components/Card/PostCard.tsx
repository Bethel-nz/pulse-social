'use client';
import { Post } from '@/types/type';
import React from 'react';
import { formatDate } from '@/lib/formatDate';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import ImageView from '@/components/ImageView/ImageView';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Userprofile from '@/components/UserProflie/Userprofile';
import { LikeButton } from './LikeButton/LikeButton';

type prop = {
	post: Post;
};
/**
 * Renders a post card with user information, content, image or video, like button, and comment count.
 *
 * @param {object} post - The post object containing user information, creation date, content, image, video, hearts, and comments.
 * @returns {JSX.Element} - Rendered HTML representing the post card.
 */
export default function PostCard({ post }: prop) {
	return (
		<>
			<article className='p-4 mt-4 font-semibold text-gray-900 bg-white border-2 rounded-md shadow-md'>
				<div className='flex items-center justify-between text-gray-950 '>
					<Link href={`/users/@${post.user.name}`}>
						<div className='flex items-center'>
							<span>
								<Userprofile
									src={`${post?.user?.image}`}
									username={`${post?.user?.name}`}
								/>
							</span>
							<span className='ml-2'>{post.user.name}</span>
						</div>
					</Link>
					<span className='text-sm font-semibold'>
						{formatDate(post.createdAt)}
					</span>
				</div>

				<p className='p-2'>{post.content}</p>
				<div>
					{post.image && <ImageView src={post.image} alt={``} />}
					{post.video && <VideoPlayer src={post.video} />}
				</div>
				<div className='w-full h-[0.10em] bg-gray-200 mt-4' />
				<div className='flex justify-between mx-auto mt-5'>
					<LikeButton
						heart={post.hearts}
						postId={post.id}
						userId={post.user.id}
					/>
					<span className='flex items-center gap-4'>
						<span>
							<MessageCircle />
						</span>
						<Link href={`/posts/${post.id}`}>
							{`${post.comments.length} comments`}
						</Link>
					</span>
				</div>
			</article>
		</>
	);
}
