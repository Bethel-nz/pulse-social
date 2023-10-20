import PostForm from '@/components/post-form/PostForm';
import React from 'react';
import { fetchAllPost } from '@/lib/utils/FetchAllPosts';
import { Post } from '@/types/type';
import { formatDate } from '@/lib/formatDate';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

export default async function page() {
	const data: Post[] = await fetchAllPost();
	console.log(data);

	return (
		<div className=''>
			<section>
				<PostForm />
			</section>
			<section className='mt-4 w-96 md:w-[32em] rounded-md p-2 shadow-lg'>
				{data?.map((post: Post) => (
					<article
						key={post.id}
						className='bg-white text-gray-500 font-semibold h-96'
					>
						{post.id}
						{formatDate(post.createdAt)}
						{post.video && <VideoPlayer src={post.video} />}
					</article>
				))}
			</section>
		</div>
	);
}
