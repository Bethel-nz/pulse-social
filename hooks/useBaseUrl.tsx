import { useEffect, useMemo, useState } from 'react';

export function useBaseURL() {
	const [baseURL, setBaseURL] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setBaseURL(window.location.origin);
		} else {
			if (process.env.VERCEL) {
				setBaseURL(process.env.VERCEL);
			}
		}
	}, []);

	const memoizedBaseURL = useMemo(() => baseURL, [baseURL]);

	return memoizedBaseURL;
}
