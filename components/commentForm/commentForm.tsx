'use client';
import React, { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useBaseURL } from '@/hooks/useBaseUrl';
import { FetchComments } from '@/lib/utils/FetchComments';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const CommentForm = ({
	postId,
	slug,
}: {
	postId: string;
	slug: string;
}) => {
	const BASE_URL = useBaseURL();
	const [comment, setComment] = useState('');
	const [text, setText] = useState('');

	const router = useRouter();
	const refreshData = () => {
		router.refresh();
	};

	const makeComment = async (e: FormEvent) => {
		e.preventDefault();
		if (comment.length > 0) {
			try {
				const res = await fetch(`${BASE_URL}/api/post/${postId}/create`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ comment, postId }),
				});
				setTimeout(() => {
					setComment('');
					FetchComments(slug);
					refreshData();
				}, 500);
			} catch (error) {
				console.error('Error posting comment:', error);
			}
		} else {
			toast.error(`you can't make empty comments`);
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			makeComment(e);
		}
	};

	return (
		<form className='flex bg-transparent rounded-md' onSubmit={makeComment}>
			<input
				type='text'
				className='w-full h-12 p-3 font-semibold text-gray-500 border-2 rounded-md shadow-sm bg-gray-200/20 border-slate-900/80 outline-transparent focus:border-slate-900'
				onChange={(e) => setComment(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button
				type='submit'
				className='p-3 ml-4 text-white rounded-md shadow-sm bg-slate-900 hover:bg-slate-700'
			>
				<Send />
			</button>
		</form>
	);
};
