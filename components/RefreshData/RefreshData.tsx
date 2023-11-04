'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Timer() {
	const route = useRouter();
	const refreshData = () => {
		route.refresh();
	};

	useEffect(() => {
		const interval = setInterval(() => {}, 5000);

		return () => clearInterval(interval);
	});
	return null;
}
