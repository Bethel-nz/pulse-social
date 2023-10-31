'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Timer() {
	const route = useRouter();

	useEffect(() => {
		const interval = setTimeout(() => {
			route.refresh();
		}, 2000);

		return () => clearTimeout(interval);
	});
	return null;
}
