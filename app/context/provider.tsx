'use client';
import { SessionProvider } from 'next-auth/react';
import { Props } from '@/types/type';

export default function Provider({ children }: Props) {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
		</>
	);
}
