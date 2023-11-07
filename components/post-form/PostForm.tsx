'use client';
import { ImagePlus, Video } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import LoadingDots from '@/components/loading-dots/loading-dots';
import { handleFileChange } from '@/lib/handleFileChange';
import { useBaseURL } from '@/hooks/useBaseUrl';
import { usePathname, useRouter } from 'next/navigation';
import { fetchAllPost } from '@/lib/utils/FetchAllPosts';

export default function PostForm() {
	const BASE_URL = useBaseURL();
	const [post, setPost] = useState('');
	const [charCount, setCharCount] = useState(0);
	const [selectedImage, setSelectedImage] = useState<File | string>('');
	const [imagePreview, setImagePreview] = useState<string>('');
	const [videoPreview, setVideoPreview] = useState<string>('');
	const [selectedVideo, setSelectedVideo] = useState<File | string>('');
	const [isLoading, setIsLoading] = useState(false);
	const MAX_FILE_SIZE = 16 * 1024 * 1024;
	const UPLOAD_PRESET = 'pulse-user';
	const router = useRouter();
	const refreshData = () => {
		router.refresh();
	};

	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		if (value.length <= 500) {
			setPost(value);
			setCharCount(value.length);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const image: File | string = selectedImage;
			const video: File | string = selectedVideo;
			const formDataImage = new FormData();
			const formDataVideo = new FormData();

			if (selectedImage) {
				formDataImage.append('file', image);
				formDataImage.append('upload_preset', UPLOAD_PRESET);
			}
			if (selectedVideo) {
				formDataVideo.append('file', video);
				formDataVideo.append('upload_preset', UPLOAD_PRESET);
			}

			const uploadImage = await fetch(
				'https://api.cloudinary.com/v1_1/pulse-app/image/upload',
				{
					method: 'POST',
					body: formDataImage,
				}
			);

			const uploadVideo = await fetch(
				'https://api.cloudinary.com/v1_1/pulse-app/video/upload',
				{
					method: 'POST',
					body: formDataVideo,
				}
			);

			const uploadedImageData = await uploadImage.json();
			const uploadedVideoData = await uploadVideo.json();
			const imageUrl: string = uploadedImageData.secure_url;
			const videoUrl: string = uploadedVideoData.secure_url;
			const data = { post, imageUrl, videoUrl };
			const registerResponse = await fetch(`${BASE_URL}/api/post/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			setIsLoading(false);
			setSelectedImage('');
			setImagePreview('');
			setVideoPreview('');
			setSelectedVideo('');
			setCharCount(0);
			setPost('');
			toast('New post submitted !', {
				icon: '🔥',
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			});
			setTimeout(() => {
				fetchAllPost();
			}, 500);
			refreshData();
		} catch (error) {
			console.error(error);
			toast.error('Post failed');
		}
	};

	return (
		<div className='w-96 md:w-[32em]  bg-white rounded-md p-2 shadow-lg'>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<textarea
						className='w-full p-2 font-semibold text-gray-500 border-gray-400 rounded-sm shadow-sm resize-none bg-gray-400/20 h-28 md:h-32 '
						value={post}
						name='post'
						placeholder={`What's on your mind ?`}
						onChange={handleTextAreaChange}
					/>
					<span className='flex text-xs font-semibold text-gray-400'>
						<span>{charCount}</span>
						<span>&nbsp;/&nbsp;500</span>
					</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<div className='flex gap-4 '>
						<label
							className='block px-4 py-2 text-sm font-semibold text-center text-gray-200 bg-gray-900 rounded-md cursor-pointer'
							htmlFor='file'
						>
							<ImagePlus />
						</label>
						<label
							className={`block text-gray-200 text-sm font-semibold bg-gray-900 rounded-md py-2 px-4 text-center cursor-pointer
								
							`}
							htmlFor='video'
						>
							<Video />
						</label>
						<input
							type='file'
							name='video'
							id='video'
							className='hidden w-full p-2 mt-2 border-gray-400 rounded-md shadow-sm bg-gray-400/20 text-slate-900'
							accept='video/*, video/mp4, video/x-m4v, video/webm'
							max={16 * 1024 * 1024}
							onChange={(e) => {
								handleFileChange(
									e,
									MAX_FILE_SIZE,
									setSelectedVideo,
									setVideoPreview
								);
							}} // Use the handleVideoChange function for video input
						/>
						<input
							type='file'
							id='file'
							name='file'
							accept='image/*'
							max={16 * 1024 * 1024}
							className='hidden w-full p-2 text-gray-800 bg-gray-300 border-gray-400 rounded-md shadow-sm'
							onChange={(e) => {
								handleFileChange(
									e,
									MAX_FILE_SIZE,
									setSelectedImage,
									setImagePreview
								);
							}}
						/>
					</div>
					<button
						type='submit'
						disabled={isLoading}
						className={`${
							isLoading
								? 'cursor-not-allowed border-black bg-gray-100 '
								: ' bg-black text-white hover:bg-white hover:text-black'
						} flex py-2 w-40 h-10 items-center justify-center rounded-md hover:border-2 hover:border-black font-semibold transition-all focus:outline-none`}
					>
						{isLoading ? (
							<LoadingDots color='#808080' />
						) : (
							<span>Pulse it</span>
						)}
					</button>
				</div>
			</form>
			<div className='flex mt-2'>
				{imagePreview && (
					<div className='relative grid w-32 h-32 border-2 rounded-md shadow-sm place-items-center group'>
						<Image
							src={imagePreview}
							width={500}
							height={500}
							alt='chosen'
							className={'aspect-square'}
						/>
					</div>
				)}
				{videoPreview && (
					<div className='relative w-32 h-32 border-2 rounded-md shadow-sm'>
						<video
							src={videoPreview}
							width={500}
							height={500}
							className={'w-full h-full object-contain'}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
