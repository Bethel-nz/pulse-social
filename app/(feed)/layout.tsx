import React from 'react';
import { Props } from '@/types/type';
import Wrapper from '@/components/wrapper/wrapper';
import Navbar from '@/components/Navbar/Navbar';
export default function layout({ children }: Props) {
	return (
		<Wrapper>
			<Navbar />
			<main className='mt-6 w-full'>{children}</main>
		</Wrapper>
	);
}
