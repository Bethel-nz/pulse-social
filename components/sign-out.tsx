'use client';
import { signOut } from 'next-auth/react';

export default function SignOut() {
	const SignOut = () => {
		const BASE_URL = window.location.origin;
		signOut({ callbackUrl: `${BASE_URL}/auth/login` });
	};
	return (
		<button
			className='text-stone-400 hover:text-stone-200 transition-all border-2 p-4 rounded-md'
			onClick={SignOut}
		>
			sign out
		</button>
	);
}
