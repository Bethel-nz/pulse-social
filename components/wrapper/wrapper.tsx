import React from 'react';
import { Props } from '@/types/type';

export default function Wrapper({ children }: Props) {
	return (
		<div className='grid justify-center w-full mx-auto place-items-center md:max-w-7xl'>
			<>{children}</>
		</div>
	);
}
