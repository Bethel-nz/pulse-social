'use client';
import { ImagePlus, Video } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import LoadingDots from '@/components/loading-dots/loading-dots';
import { handleFileChange } from '@/lib/handleFileChange';

export default function PostForm() {
	const [post, setPost] = useState('');
	const [charCount, setCharCount] = useState(0);
	const [selectedImage, setSelectedImage] = useState<File | string>('');
	const [imagePreview, setImagePreview] = useState<string>('');
	const [videoPreview, setVideoPreview] = useState<string>('');
	const [selectedVideo, setSelectedVideo] = useState<File | string>('');
	const [isLoading, setIsLoading] = useState(false);
	const MAX_FILE_SIZE = 16 * 1024 * 1024;
	const UPLOAD_PRESET = 'pulse-user';

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
			const registerResponse = await fetch(
				'http://localhost:3000/api/post/create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			if (registerResponse.ok) {
				setIsLoading(false);
				setSelectedImage('');
				setVideoPreview('');
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
			} else {
				const { error } = await registerResponse.json();
				toast.error(error);
			}
		} catch (error) {
			console.error(error);
			toast.error('Unknown error');
		}
	};

	return (
		<div className='w-96 md:w-[32em]  bg-white rounded-md p-2 shadow-lg'>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<textarea
						className='w-full bg-gray-400/20 text-gray-500 shadow-sm border-gray-400 resize-none h-28 md:h-40 rounded-sm p-2 font-semibold '
						value={post}
						name='post'
						placeholder={`What's on your mind ?`}
						onChange={handleTextAreaChange}
					/>
					<span className='flex text-xs text-gray-400 font-semibold'>
						<span>{charCount}</span>
						<span> /500</span>
					</span>
				</div>
				<div className='flex w-full items-center justify-between'>
					<div className=' flex gap-4'>
						<label
							className='block text-gray-200 text-sm font-semibold bg-gray-900 rounded-md py-2 px-4 text-center cursor-pointer'
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
							className='w-full bg-gray-400/20 text-slate-900 shadow-sm border-gray-400 rounded-md p-2 mt-2 hidden'
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
							className='w-full bg-gray-300 text-gray-800 shadow-sm border-gray-400 rounded-md p-2 hidden'
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
			<div className='mt-2 flex'>
				{imagePreview && (
					<div className='h-32 w-32 border-2 rounded-md shadow-sm relative grid place-items-center group'>
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
					<div className='h-32 w-32 border-2 rounded-md shadow-sm relative'>
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
