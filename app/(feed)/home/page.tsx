import PostForm from '@/components/post-form/PostForm';
import React from 'react';
import { fetchAllPost } from '@/lib/utils/FetchAllPosts';
import { Post } from '@/types/type';
import PostCard from '@/components/Card/PostCard';
import { StaggerWrapper } from '@/components/StaggerWrapper/StaggerWrapper';
export default async function page() {
	const data: Post[] = await fetchAllPost();
	return (
		<div>
			<section>
				<PostForm />
			</section>
			<section className='mt-4 w-96 md:w-[32em] rounded-md p-2 shadow-lg pt-4 border'>
				{data &&
					data?.map((post: Post, index) => (
						<StaggerWrapper key={post.id} index={index}>
							<PostCard post={post} key={post.id} />
						</StaggerWrapper>
					))}
			</section>
		</div>
	);
}
