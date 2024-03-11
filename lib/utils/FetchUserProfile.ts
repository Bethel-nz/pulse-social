import { UserData } from '@/types';

export const fetchUserProfile = async (arg: string) => {
	const response = await fetch(
		`https://pulse-social.vercel.app/api/users/${arg}`,
		{
			cache: 'no-store',
			next: {
				revalidate: 1,
			},
		}
	);
	const data: UserData = await response.json();
	// Initialize posts array if it doesn't exist
	return data;
};
