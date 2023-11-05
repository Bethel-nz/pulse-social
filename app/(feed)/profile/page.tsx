import Userprofile from '@/components/UserProflie/Userprofile';
import SignOut from '@/components/sign-out';
import { fetchUserProfile } from '@/lib/utils/FetchUserProfile';
import React from 'react';
``;
export default async function page() {
	const data = await fetchUserProfile();
	console.log(data);

	return (
		<>
			<SignOut />
		</>
	);
}
