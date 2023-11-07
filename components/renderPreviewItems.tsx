import Image from 'next/image';
import { X } from 'lucide-react';
import { renderViewprops } from '@/types';

export function renderPreviewItem({
	preview,
	onClickHandler,
	type,
}: renderViewprops) {
	return (
		<div className='relative grid w-32 h-32 border-2 rounded-md shadow-sm place-items-center group'>
			{type === 'image' ? (
				<Image
					src={preview}
					width={500}
					height={500}
					alt='chosen'
					className='aspect-square'
				/>
			) : type === 'video' ? (
				<video
					src={preview}
					width={500}
					height={500}
					className='object-contain w-full h-full'
				/>
			) : null}
			<button
				className='absolute top-0 bottom-0 left-0 right-0 items-center justify-center hidden w-8 h-8 mt-0 text-white bg-gray-600 rounded-full text-md group-hover:flex'
				onClick={onClickHandler}
			>
				<X />
			</button>
		</div>
	);
}
