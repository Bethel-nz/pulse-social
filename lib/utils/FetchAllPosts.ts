// import { Post } from '@/types/type';

// export const fetchAllPost = async () => {
// 	const BASE_URL = process.env.BASE_URL;
// 	const response = await fetch(`${BASE_URL}/api/post`, {
// 		cache: 'no-store',
// 		next: { tags: ['all-post'] },
// 	});
// 	const data: Post[] = await response.json();
// 	return data;
// };

import { Post } from '@/types/type';

export const fetchAllPost = async () => {
	const BASE_URL = process.env.BASE_URL;

	// Define an IIFE that performs the fetch and returns the response
	const fetchPosts = async () => {
		const response = await fetch(`${BASE_URL}/api/post?tags=all-post`, {
			cache: 'no-store',
		});
		return response;
	};

	// Invoke the IIFE to fetch data and return the response
	const response = await fetchPosts();

	// Ensure that the response status is okay before parsing it
	if (response.ok) {
		const data: Post[] = await response.json();
		return data;
	} else {
		throw new Error(`Failed to fetch data. Status: ${response.status}`);
	}
};
