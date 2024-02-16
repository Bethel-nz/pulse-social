export const FetchComments = async (slug: string) => {
	const response = await fetch(
		`https://pulse-social.vercel.app/api/post/${slug}`,
		{
			cache: 'no-store',
			next: { tags: ['all-post'], revalidate: 1 },
		}
	);
	const data = await response.json();
	return data;
};
