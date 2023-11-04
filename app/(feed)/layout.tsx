import React from 'react';
import { Props } from '@/types/type';
import Wrapper from '@/components/wrapper/wrapper';
import Navbar from '@/components/Navbar/Navbar';

import { Toaster } from 'react-hot-toast';
import Timer from '@/components/RefreshData/RefreshData';
export default function layout({ children }: Props) {
	return (
		<Wrapper>
			<Navbar />
			<Toaster />
			<main className='mt-6 w-96 md:w-[32em]'>{children}</main>
		</Wrapper>
	);
}
