'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AuthStatus() {
	const { data: session, status } = useSession();
	const name = session?.user?.name;

	return (
		<div className='flex items-center justify-center w-full '>
			{session && (
				<div className='text-sm text-slate-900'>
					<Image
						width={512}
						height={512}
						className='object-contain w-8 h-8 rounded-full aspect-square'
						src={session?.user?.image}
						alt={`${name}'s profile`}
					/>
				</div>
			)}
		</div>
	);
}
