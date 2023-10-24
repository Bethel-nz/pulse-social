import { SkeletonCard } from '@/components/Skeleton/SkeletonCard';
import { StaggerWrapper } from '@/components/StaggerWrapper/StaggerWrapper';
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
					<StaggerWrapper index={5}>
						<SkeletonCard type='post' />
						<SkeletonCard type='video' />
						<SkeletonCard type='post' />
						<SkeletonCard type='post' />
						<SkeletonCard type='video' />
					</StaggerWrapper>
				</div>
			</div>
		</div>
	);
}
