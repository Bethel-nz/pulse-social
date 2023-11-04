export const FetchComments = async (slug: string) => {
	const BASE_URL = process.env.BASE_URL;
	const response = await fetch(`${BASE_URL}/api/post/${slug}`, {
		cache: 'no-store',
		next: { tags: ['all-post'] },
	});
	const data = await response.json();
	return data;
};
