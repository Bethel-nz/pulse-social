import { UserData } from '@/types';

export const fetchUserProfile = async (arg: string) => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`${BASE_URL}/api/users/${arg}`);
	const data: UserData = await response.json();
	// Initialize posts array if it doesn't exist
	return data;
};
