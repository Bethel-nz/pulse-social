import Image from 'next/image';
import { X } from 'lucide-react';

type props = {
	preview: string;
	onClickHandler: () => string;
	type: string;
};
export function renderPreviewItem(
	preview: string,
	onClickHandler: () => string,
	type: string
) {
	return (
		<div className='h-32 w-32 border-2 rounded-md shadow-sm relative grid place-items-center group'>
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
					className='w-full h-full object-contain'
				/>
			) : null}
			<button
				className='text-white top-0 bottom-0 left-0 right-0 absolute bg-gray-600 h-8 w-8 items-center justify-center rounded-full mt-0 text-md group-hover:flex hidden'
				onClick={onClickHandler}
			>
				<X />
			</button>
		</div>
	);
}
