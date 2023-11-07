'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AuthStatus from '../auth-status';
import Link from 'next/link';
import { ProfileLink } from './ProfileLink';
import { useSession } from 'next-auth/react';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const { data: session } = useSession();
	const username = session?.user?.name;

	useEffect(() => {
		const checkScroll = () => {
			if (window.scrollY >= 10) {
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
			className={`flex flex-row items-center justify-between w-96 p-2 mt-4 border-2 rounded-full gap-x-10 z-20 top-4 transition-all duration-300 ease-in-out ${
				isScrolled
					? 'fixed bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'
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
				<>
					<li
						className={` ${
							pathname === `/users/@${username}`
								? 'bg-black text-white border-2'
								: 'bg-gray-200 text-black'
						} inline-flex w-32 px-4 py-2 rounded-full font-semibold group`}
					>
						<ProfileLink />
					</li>
				</>
			</ul>
		</nav>
	);
}
