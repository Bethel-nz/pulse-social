'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AuthStatus from '../auth-status';
import Link from 'next/link';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const checkScroll = () => {
			if (window.scrollY > 100) {
				// Sets the scroll height limit to 100px
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', checkScroll);
		return () => {
			window.removeEventListener('scroll', checkScroll);
		};
	}, []);

	return (
		<nav
			className={`sticky flex flex-row items-center justify-between w-96 p-2 mt-4 border-2 rounded-full gap-x-10 ${
				isScrolled
					? 'bg-gray-400 rounded-full  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'
					: ''
			}`}
		>
			<>
				<Link href={'/'}>
					<Image
						width={512}
						height={512}
						src={'/logo.png'}
						alt='logo'
						className='w-12 transition-all duration-200 delay-100 rounded-full aspect-square hover:ring-4 hover:ring-black ring-offset-4'
					/>
				</Link>
			</>
			<ul className='inline-flex items-center ml-auto gap-x-2'>
				<li
					className={`${
						pathname === '/home'
							? 'bg-black text-white'
							: 'bg-gray-200 text-black'
					} grid w-32 h-12 px-4 py-2 rounded-full place-items-center font-semibold`}
				>
					<Link
						href={'/home'}
						prefetch={true}
						className='flex items-center justify-center w-full h-full '
					>
						Home
					</Link>
				</li>
				<li
					className={` ${
						pathname === '/profile'
							? 'bg-black text-white border-2'
							: 'bg-gray-200 text-black'
					} inline-flex w-32 px-4 py-2 rounded-full font-semibold group`}
				>
					<Link
						href={'/profile'}
						prefetch={true}
						className='inline-flex items-center w-full h-full gap-4'
					>
						<span className=''>Profile</span>
						<span className='ring-2 rounded-full ring-offset-2 ring-black'>
							<AuthStatus />
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
