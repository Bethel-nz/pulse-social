'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
	const router = useRouter();
	return (
		<div>
			<button
				className='p-1 text-white text-md font-bold shadow-sm bg-slate-900 hover:bg-slate-700 rounded-full'
				onClick={router.back}
			>
				<ChevronLeft />
			</button>
		</div>
	);
};

export default BackButton;
