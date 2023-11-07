import { fetchUserProfile } from '@/lib/utils/FetchUserProfile';
import PostForm from '@/components/post-form/PostForm';
import Image from 'next/image';
import { Post } from '@/types/type';
import PostCard from '@/components/Card/PostCard';
import { StaggerWrapper } from '@/components/StaggerWrapper/StaggerWrapper';
import Userprofile from '@/components/UserProflie/Userprofile';
import { formatDate } from '@/lib/formatDate';
import ImageView from '@/components/ImageView/ImageView';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import Link from 'next/link';
import BackButton from '@/components/BackButton/BackButton';

type Params = {
	params: {
		user: string;
	};
};
type post = {
	id: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	image: string | null;
	video: string | null;
	published: boolean;
	userId: string;
};

export default async function Page({ params: { user } }: Params) {
	const username = user.split('%40')[1];
	const data = await fetchUserProfile(username);
	const postCount = data.posts.length;
	return (
		<>
			<div>
				<section className='mb-4 w-96 relative md:w-[32em] rounded-md p-2 shadow-lg pt-4 border flex flex-col items-center justify-center'>
					<Image
						width={512}
						height={512}
						className={`object-contain w-40 rounded-full ring-4 ring-black ring-offset-4 border border-black`}
						src={data.image}
						alt={`${username}'s profile`}
					/>
					<div className='absolute top-0 left-0 m-2 shadow-xl'>
						<BackButton />
					</div>
					<div className='mt-4'>
						<div className='px-4 py-4 text-sm text-white bg-black rounded-full text-bold'>
							{data.name}
						</div>
					</div>
					<div className='flex flex-col mt-2 space-x-4 text-center'>
						<span>
							mail: <span className='font-semibold'>{data.email}</span>
						</span>
						<span>
							Total Post: <span className='font-semibold'>{postCount}</span>
						</span>
					</div>
				</section>

				<section>
					<section className='mt-4 w-96 md:w-[32em] rounded-md p-2 shadow-lg pt-4 border'>
						{data &&
							data.posts?.map((post: post, index) => (
								<StaggerWrapper key={post.id} index={index}>
									<Link href={`/posts/${post.id}`}>
										<div className='p-4 mt-4 font-semibold text-gray-900 bg-white border-2 rounded-md shadow-md'>
											<div className='flex items-center justify-between text-gray-950 '>
												<div className='flex items-center'>
													<span>
														<Userprofile
															src={`${data?.image}`}
															username={`${data.name}`}
														/>
													</span>
													<span className='ml-2'>{data.name}</span>
												</div>
												<span className='text-sm font-semibold'>
													{formatDate(post.createdAt)}
												</span>
											</div>
											<p className='p-2'>{post.content}</p>
											<div>
												{post.image && <ImageView src={post.image} alt={``} />}
												{post.video && <VideoPlayer src={post.video} />}
											</div>
										</div>
									</Link>
								</StaggerWrapper>
							))}
					</section>
				</section>
			</div>
		</>
	);
}
