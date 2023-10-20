import { Post } from '@/types/type';
import React from 'react';
import { formatDate } from '@/lib/formatDate';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import ImageView from '@/components/ImageView/ImageView';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import AuthStatus from '@/components/auth-status';
import Userprofile from '@/components/UserProflie/Userprofile';

type prop = {
	post: Post;
};
export default function PostCard({ post }: prop) {
	return (
		<>
			<article className='bg-white text-gray-500 font-semibold p-4 border-2 rounded-md'>
				<div className='flex justify-between items-center text-gray-900 '>
					<div className='flex items-center'>
						<span>
							<Userprofile
								src={`${post?.user?.image}`}
								username={`${post?.user?.name}`}
							/>
						</span>
						<span className='ml-2'>{post.user.name}</span>
					</div>
					<span className='font-semibold text-sm'>
						{formatDate(post.createdAt)}
					</span>
				</div>

				<p className='p-2'>{post.content}</p>
				<div>
					{post.image && <ImageView src={post.image} alt={``} />}
					{post.video && <VideoPlayer src={post.video} />}
				</div>
				<div className='w-full h-[0.10em] bg-gray-200 mt-4' />
				<div className='flex mt-5 w-96 mx-auto justify-between'>
					<span className='flex gap-4 items-center'>
						<button>
							<Heart className='border-transparent border-gray-100 outline-none' />
						</button>
						{post.hearts.length <= 1
							? `${post.hearts.length} likes`
							: `${post.hearts} likes`}
					</span>
					<span className='flex gap-4 items-center'>
						<span>
							<MessageCircle />
						</span>
						<Link href={`/posts/${post.id}`}>
							{post.comments.length <= 1
								? `${post.comments.length} comments`
								: `${post.comments} comments`}
						</Link>
					</span>
				</div>
			</article>
		</>
	);
}
