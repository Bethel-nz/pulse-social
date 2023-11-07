import React from 'react';
import { Props } from '@/types';
import Wrapper from '@/components/wrapper/wrapper';
import Navbar from '@/components/Navbar/Navbar';

/**
 * Renders the layout component for a React application.
 *
 * @param {Props} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the layout component.
 * @returns {JSX.Element} The rendered layout component.
 */
export default function layout({ children }: Props) {
	return (
		<Wrapper>
			<Navbar />
			<main className='mt-6 w-96 md:w-[32em]'>{children}</main>
		</Wrapper>
	);
}
