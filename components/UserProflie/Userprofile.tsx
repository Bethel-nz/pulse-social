import Image from 'next/image';
import React from 'react';

type props = {
	src: string;
	username: string;
};
export default function Userprofile({ src, username }: props) {
	return (
		<>
			<Image
				width={512}
				height={512}
				className='object-contain w-8 h-8 rounded-full aspect-square'
				src={src}
				alt={`${username}'s profile`}
			/>
		</>
	);
}
