import Image from 'next/image';
import React from 'react';

type props = {
	src: string;
	username: string;
	size?: string;
};
export default function Userprofile({ src, username, size }: props) {
	return (
		<>
			<Image
				width={512}
				height={512}
				className={`object-contain w-8 h-8 rounded-full ${size}`}
				src={src}
				alt={`${username}'s profile`}
			/>
		</>
	);
}
