import Link from 'next/link';
import React from 'react';
import AuthStatus from '../auth-status';
import { useSession } from 'next-auth/react';

export const ProfileLink = () => {
	const { data: session } = useSession();
	const username = session?.user?.name;

	return (
		<>
			<Link
				href={`/users/@${username}`}
				prefetch={true}
				className='inline-flex items-center w-full h-full gap-4'
			>
				<span className=''>Profile</span>
				<span className='ring-2 rounded-full ring-offset-2 ring-black'>
					<AuthStatus />
				</span>
			</Link>
		</>
	);
};
