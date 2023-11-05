import React from 'react';
import { Props } from '@/types/type';
import Wrapper from '@/components/wrapper/wrapper';
import Navbar from '@/components/Navbar/Navbar';

import { Toaster } from 'react-hot-toast';
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
			<Toaster />
			<main className='mt-6 w-96 md:w-[32em]'>{children}</main>
		</Wrapper>
	);
}
