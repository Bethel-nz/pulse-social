import { useEffect, useState } from 'react';

export function useBaseURL() {
	const [baseURL, setBaseURL] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setBaseURL(window.location.href);
		} else {
			if (process.env.VERCEL) {
				setBaseURL(process.env.VERCEL);
			}
		}
	}, []);

	return baseURL;
}