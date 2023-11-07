'use client';
import { SessionProvider } from 'next-auth/react';
import { Props } from '@/types';

/**
 * React component that wraps its children with a SessionProvider component from the next-auth/react library.
 *
 * @component
 * @example
 * ```tsx
 * import { SessionProvider } from 'next-auth/react';
 * import { Props } from '@/types/type';
 *
 * export type Props = {
 *   children: React.ReactNode;
 * };
 *
 * export default function Provider({ children }: Props) {
 *   return (
 *     <>
 *       <SessionProvider>{children}</SessionProvider>
 *     </>
 *   );
 * }
 * ```
 */
export default function Provider({ children }: Props) {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
		</>
	);
}
