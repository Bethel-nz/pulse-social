'use client';
import { useEffect } from 'react';
import { SkeletonCard } from '@/components/Skeleton/SkeletonCard';
import { RefreshCcwIcon } from 'lucide-react';
import PostForm from '@/components/post-form/PostForm';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<div className='flex flex-col items-center justify-center mt-4'>
				<div>
					<PostForm />
				</div>
				<div className='bg-white p-4 w-full mt-2 shadow-md text-center mx-auto'>
					<h2>Something went wrong!</h2>
					<button
						onClick={reset}
						className='flex items-center space-x-1 mx-auto'
					>
						<RefreshCcwIcon size={16} className='text-gray-400' />
						<span className='font-semibold'>Try again</span>
					</button>
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
