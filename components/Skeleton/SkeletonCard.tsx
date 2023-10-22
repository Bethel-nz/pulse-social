type prop = {
	type: 'post' | 'video';
};
export function SkeletonCard({ type }: prop) {
	return (
		<div className='bg-white p-4 border-2 rounded-md mt-4 shadow-md animate-pulse'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center mb-4'>
					<div className='rounded-full bg-gray-200 h-12 w-12' />
					<div className='ml-2'>
						<span className='h-4 bg-gray-200 rounded w-3/4' />
						<div className='space-y-2'>
							<span className='h-4 bg-gray-200 rounded' />
							<span className='h-4 bg-gray-200 rounded w-5/6' />
						</div>
					</div>
				</div>
				<span className='h-4 bg-gray-200 rounded w-20'></span>
			</div>
			{type === 'post' && <div className='p-2 h-20 bg-gray-200 rounded' />}
			{type === 'video' && (
				<div>
					<div className='h-48 bg-gray-200 rounded' />
				</div>
			)}
			<div className='w-full h-[0.10em] bg-gray-200 mt-4' />
			<div className='flex mt-5 mx-auto justify-between'>
				<span className='flex gap-4 items-center'>
					<button>
						<div className='border-transparent border-gray-100 outline-none bg-gray-200 rounded-full h-8 w-8'></div>
					</button>
					<span className='h-4 bg-gray-200 rounded w-16'></span>
				</span>
				<span className='flex gap-4 items-center'>
					<span>
						<div className='bg-gray-200 rounded-full h-8 w-8'></div>
					</span>
					<span className='h-4 bg-gray-200 rounded w-16'></span>
				</span>
			</div>
		</div>
	);
}
