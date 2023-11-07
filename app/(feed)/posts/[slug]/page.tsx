import { FetchComments } from '@/lib/utils/FetchComments';
import React from 'react';
import { formatDate } from '@/lib/formatDate';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import ImageView from '@/components/ImageView/ImageView';
import Userprofile from '@/components/UserProflie/Userprofile';
import { CommentForm } from '@/components/commentForm/commentForm';
import { ChevronLeft } from 'lucide-react';
import BackButton from '@/components/BackButton/BackButton';
import Link from 'next/link';

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
				<article className='p-4 mt-4 font-semibold text-gray-900 bg-white border-2 rounded-md shadow-md'>
					<div className='flex items-center justify-between text-gray-950 '>
						<Link href={`/users/@${data.user.name}`}>
							<div className='flex items-center'>
								<span>
									<Userprofile
										src={`${data?.user?.image}`}
										username={`${data?.user?.name}`}
									/>
								</span>
								<span className='ml-2'>{data.user.name}</span>
							</div>
						</Link>
						<span className='text-sm font-semibold'>
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
					<div className='rounded-md shadow-lg '>
						<div className='px-2 py-6 mt-2 bg-white border-2 border-gray rounde-md'>
							{data.comments.map((comment) => (
								<div key={comment.id} className='p-2 mt-2 border-2 shadow-md'>
									<div className='flex items-center justify-between py-3 text-gray-950'>
										<Link href={`/users/@${comment.user.name}`}>
											<div className='flex font-semibold gap-x-2'>
												<span>
													<Userprofile
														src={`${comment?.user?.image}`}
														username={`${comment?.user?.name}`}
													/>
												</span>
												<span>{comment.user.name}</span>
											</div>
										</Link>
										<span className='text-sm font-semibold'>
											{formatDate(comment.createdAt)}
										</span>
									</div>
									<span className='py-4 mt-4 ml-2 font-semibold text-gray-600'>
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
