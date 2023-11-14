'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOut from '../sign-out';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const pathname = usePathname();
	const { data: session } = useSession();
	const username = session?.user?.name;
	const image = session?.user?.image;

	useEffect(() => {
		const checkScroll = () => {
			if (window.scrollY >= 20) {
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
			className={`flex flex-row items-center justify-between w-96 p-2 mt-4 border-2 rounded-full gap-x-10 z-20 top-4 transition-all duration-300 ease-in-out  ${
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
						className='transition-all duration-200 delay-100 rounded-full w-14 aspect-square hover:ring-4 hover:ring-black ring-offset-4'
					/>
				</Link>
			</>
			<ul className='inline-flex items-center justify-between w-full ml-auto gap-x-2'>
				<li
					className={`${
						pathname === '/home'
							? 'bg-black text-white'
							: 'bg-gray-200 text-black'
					} grid h-12 w-full  py-1 rounded-full place-items-center font-semibold`}
				>
					<Link
						href={'/home'}
						prefetch={true}
						className='flex items-center justify-center h-full '
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
						}grid h-12 py-1 w-full rounded-full place-items-center font-semibold`}
					>
						<Link
							href={`/users/@${username}`}
							prefetch={true}
							className='flex items-center justify-center h-full '
						>
							Profile
						</Link>
					</li>
				</>
				<li className='relative rounded-full ring-2 ring-offset-2 ring-black'>
					<div
						className='flex items-center justify-center w-10 '
						onClick={() => setShowMenu((state) => !state)}
					>
						<Image
							width={512}
							height={512}
							className='w-full rounded-full'
							//ts-ignore
							src={image || '/default-image.webp'}
							alt={`${username}'s profile`}
						/>
					</div>
					{showMenu && (
						<AnimatePresence initial={false}>
								<motion.div
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -50, opacity: 0 }}
						transition={{ duration: 1, type: 'tween' }}
						className={`absolute right-0 w-32 p-2 m-4 bg-white rounded-md shadow-lg -bottom-18 h-14`}
					>
								<SignOut />
							</motion.div>
						</AnimatePresence>
					)}
				</li>
			</ul>
		</nav>
	);
}

//w-12 h-12
