// import { useEffect, useMemo, useState } from 'react';

// export function useBaseURL() {
// 	const [baseURL, setBaseURL] = useState('');

// 	useEffect(() => {
// 		if (typeof window !== 'undefined') {
// 			setBaseURL(window.location.origin);
// 		} else {
// 			if (process.env.BASE_URL) {
// 				setBaseURL(process.env.BASE_URL);
// 			}
// 		}
// 	}, []);

// 	const memoizedBaseURL = useMemo(() => baseURL, [baseURL]);

// 	return memoizedBaseURL;
// }
