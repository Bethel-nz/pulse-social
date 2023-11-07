'use client';
import Image from 'next/image';
import Form from '@/components/form/form';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
	const containerVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				type: 'spring',
				damping: 10,
				stiffness: 100,
			},
		},
	};

	const formVariants = {
		hidden: {
			opacity: 0,
			x: 100,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 10,
				stiffness: 100,
				delay: 0.5,
			},
		},
	};
	return (
		<>
			<motion.div
				initial='hidden'
				animate='visible'
				variants={containerVariants}
				className='flex h-screen w-full items-center justify-center bg-gray-50 overflow-hidden border-4'
			>
				<div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border-gray-100 '>
					<motion.div
						initial='hidden'
						animate='visible'
						variants={formVariants}
						className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 sm:px-16'
					>
						<div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
							<div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border-4 border-gray-100 shadow-lg'>
								<div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16'>
									<Link href='/'>
										<Image
											src='/logo.png'
											priority
											alt='Logo'
											className='h-10 w-10 rounded-full'
											width={20}
											height={20}
										/>
									</Link>
									<h3 className='text-xl font-semibold'>Sign In</h3>
									<p className='text-sm text-gray-500'>
										Use your email and password to sign in
									</p>
								</div>
								<Form type='login' />
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</>
	);
}
