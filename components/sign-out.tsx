'use client';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOut() {
	const SignOut = () => {
		const BASE_URL = window.location.origin;
		signOut({ callbackUrl: `https://pulse-social.vercel.app/auth/login` });
	};
	return (
		<button
			className='flex gap-x-2 transition-all rounded-md text-slate-900 hover:text-slate-700 mx-auto hover:bg-gray-200 p-2 font-semibold'
			onClick={SignOut}
		>
			<span>Sign Out</span>
			<LogOut />
		</button>
	);
}
