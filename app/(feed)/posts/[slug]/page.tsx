import { FetchComments } from '@/lib/utils/FetchComments';
import React from 'react';
import { formatDate } from '@/lib/formatDate';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import ImageView from '@/components/ImageView/ImageView';
import Userprofile from '@/components/UserProflie/Userprofile';
import { CommentForm } from '@/components/commentForm/commentForm';
import { ChevronLeft } from 'lucide-react';
import BackButton from '@/components/BackButton/BackButton';

type Params = {
	params: {
		slug: string;
	};
};

type Data = {
	id: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	image: string;
	video: string;
	published: boolean;
	userId: string;
	user: {
		id: string;
		name: string;
		email: string;
		password: string;
		image: string;
		banner: string | null;
		role: string;
	};

	hearts: {
		id: string;
		postId: string;
		userId: string;
	}[];
	comments: {
		createdAt: string;
		id: string;
		title: string;
		postId: string;
		userId: string;
		user: {
			id: string;
			name: string;
			email: string;
			password: string;
			image: string;
			banner: string | null;
			role: string;
		};
	}[];
};

type comment = {
	id: string;
};

export default async function page({ params: { slug } }: Params) {
	const data: Data = await FetchComments(slug);
	return (
		<div>
			<>
				<div>
					<BackButton />
				</div>
				<article className='bg-white text-gray-900 font-semibold p-4 border-2 rounded-md mt-4 shadow-md'>
					<div className='flex justify-between items-center text-gray-950 '>
						<div className='flex items-center'>
							<span>
								<Userprofile
									src={`${data?.user?.image}`}
									username={`${data?.user?.name}`}
								/>
							</span>
							<span className='ml-2'>{data.user.name}</span>
						</div>
						<span className='font-semibold text-sm'>
							{formatDate(data.createdAt)}
						</span>
					</div>

					<p className='p-2'>{data.content}</p>
					<div>
						{data.image && <ImageView src={data.image} alt={``} />}
						{data.video && <VideoPlayer src={data.video} />}
					</div>
					<div className='w-full h-[0.10em] bg-gray-200 mt-4' />
					<div className='mt-4'>
						<CommentForm postId={data.id} slug={slug} />
					</div>
				</article>
				{data.comments.length >= 1 && (
					<div className=' shadow-lg rounded-md '>
						<div className='  bg-white border-gray border-2 px-2 py-6 rounde-md mt-2'>
							{data.comments.map((comment) => (
								<div key={comment.id} className='p-2 mt-2 border-2 shadow-md'>
									<div className='flex justify-between items-center text-gray-950 py-3'>
										<div className='flex gap-x-2 font-semibold'>
											<span>
												<Userprofile
													src={`${comment?.user?.image}`}
													username={`${comment?.user?.name}`}
												/>
											</span>
											<span>{comment.user.name}</span>
										</div>
										<span className='font-semibold text-sm'>
											{formatDate(comment.createdAt)}
										</span>
									</div>
									<span className='font-semibold mt-4 py-4 text-gray-600 ml-2'>
										{comment.title}
									</span>
									<span></span>
								</div>
							))}
						</div>
					</div>
				)}
			</>
		</div>
	);
}
