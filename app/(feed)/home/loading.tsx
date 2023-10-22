import { SkeletonCard } from '@/components/Skeleton/SkeletonCard';
import PostForm from '@/components/post-form/PostForm';
import React from 'react';

export default function Loading() {
	return (
		<div>
			<div className='flex flex-col items-center justify-center mt-4'>
				<div>
					<PostForm />
				</div>
				<div className='mt-4 w-96 md:w-[32em] rounded-md p-2 shadow-lg pt-4 border'>
					<SkeletonCard type='post' />
					<SkeletonCard type='video' />
					<SkeletonCard type='post' />
					<SkeletonCard type='post' />
					<SkeletonCard type='video' />
				</div>
			</div>
		</div>
	);
}
