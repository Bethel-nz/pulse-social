'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
	const router = useRouter();
	const { data: session } = useSession();
	useEffect(() => {
		setTimeout(() => {
			!session ? router.push('/auth/login') : router.push('/home');
		}, 1500);
	});
	return (
		<div className='flex h-screen overflow-hidden'>
			<div className='w-screen relative flex flex-col justify-center items-center'>
				<div className='absolute w-60 h-60 animate-ping delay-600 bg-black rounded-full ' />
				<div className='absolute w-56 h-56 animate-pulse delay-400 bg-white rounded-full ' />
				<div className='absolute w-52 h-52 animate-pulse delay-200 bg-black rounded-full ' />
				<Image
					width={512}
					height={512}
					src='/logo.png'
					alt='Platforms on Vercel'
					className='w-48 h-48 relative z-10 '
				/>
			</div>
		</div>
	);
}
