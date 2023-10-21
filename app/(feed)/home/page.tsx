import PostForm from '@/components/post-form/PostForm';
import React from 'react';
import { fetchAllPost } from '@/lib/utils/FetchAllPosts';
import { Post } from '@/types/type';
import PostCard from '@/components/Card/PostCard';

export default async function page() {
	const data: Post[] = await fetchAllPost();
	const post = await data;
	return (
		<div>
			<section>
				<PostForm />
			</section>
			<section className='mt-4 w-96 md:w-[32em] rounded-md p-2 shadow-lg pt-4 border'>
				{post?.map((post: Post) => (
					<PostCard post={post} key={post.id} />
				))}
			</section>
		</div>
	);
}
