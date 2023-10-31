import React from 'react';
import Image from 'next/image';

type props = {
	src: string;
	alt: string;
};

export default function ImageView({ src, alt }: props) {
	return (
		<>
			<Image
				alt={alt}
				src={src}
				width={500}
				height={500}
				className='w-[22em] h-full object-contain aspect-auto md:w-[28em] mt-4 shadow-md shadow-gray-500 mx-auto rounded-lg '
			/>
		</>
	);
}
