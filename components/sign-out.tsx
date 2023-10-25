'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
	const router = useRouter();
	const SignOut = ()=> {
	signOut();
		setTimeout(() => {
			console.log('done');
			router.push('/login');
		}, 850);
	}
	return (
		<button
			className='text-stone-400 hover:text-stone-200 transition-all border-2 p-4 rounded-md'
			onClick={SignOut()}>
			Goddammit, sign me out!
		</button>
	);
}
