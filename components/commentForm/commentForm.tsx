'use client';
import { useBaseURL } from '@/hooks/useBaseUrl';
import { FetchComments } from '@/lib/utils/FetchComments';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
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
				if (!res.ok) {
					throw new Error(`Server responded with status code ${res.status}`);
				}
				FetchComments(slug);
				refreshData();
				setComment('');
			} catch (error) {
				console.error('Error posting comment:', error);
				// Here you could also set some state to show an error message to the user
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
		<form className='bg-transparent rounded-md flex' onSubmit={makeComment}>
			<input
				type='text'
				className='w-full bg-gray-200/20 text-gray-500 shadow-sm border-2 border-slate-900/80 h-12 rounded-md p-3 font-semibold outline-transparent focus:border-slate-900'
				onChange={(e) => setComment(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button
				type='submit'
				className='bg-slate-900 text-white p-3 rounded-md ml-4 shadow-sm hover:bg-slate-700'
			>
				<Send />
			</button>
		</form>
	);
};
