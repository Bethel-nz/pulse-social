'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
	const router = useRouter();
	return (
		<div>
			<button
				className='p-3 font-bold text-white rounded-md shadow-sm bg-slate-900 hover:bg-slate-700'
				onClick={router.back}
			>
				<ChevronLeft />
			</button>
		</div>
	);
};

export default BackButton;
