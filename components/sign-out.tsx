'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
	const router = useRouter();
	return (
		<button
			className='text-stone-400 hover:text-stone-200 transition-all border-2 p-4 rounded-md'
			onClick={() => {
				signOut();
				router.replace('/login');
			}}
		>
			Goddammit, sign me out!
		</button>
	);
}
