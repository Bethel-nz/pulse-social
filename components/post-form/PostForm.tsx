'use client';
import { ImagePlus, Video } from 'lucide-react';
import { useState, FormEvent, ChangeEvent, useTransition } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';
import { usePathname } from 'next/navigation';
import LoadingDots from '@/components/loading-dots/loading-dots';

export default function PostForm() {
	const path = usePathname();
	const [post, setPost] = useState('');
	const [charCount, setCharCount] = useState(0);
	const [selectedImage, setSelectedImage] = useState<File | string>('');
	const [imagePreview, setImagePreview] = useState<string>('');
	const [videoPreview, setVideoPreview] = useState<string>('');
	const [selectedVideo, setSelectedVideo] = useState<File | string>('');
	const [isLoading, setIsLoading] = useState(false);
	const MAX_FILE_SIZE = 16 * 1024 * 1024;
	const UPLOAD_PRESET = 'pulse-user';

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.size <= MAX_FILE_SIZE) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setImagePreview(event?.target?.result as string);
			};
			reader.readAsDataURL(file);
			setSelectedImage(file);
		} else {
			toast.error('File size exceeds 16MB');
		}
	};

	const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.size <= MAX_FILE_SIZE) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setVideoPreview(event?.target?.result as string);
			};
			reader.readAsDataURL(file);
			setSelectedVideo(file);
		} else {
			toast.error('File size exceeds 16MB');
		}
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

			// if (
			// 	(selectedImage && uploadImage instanceof Response && uploadImage.ok) ||
			// 	(selectedVideo && uploadVideo instanceof Response && uploadVideo.ok)
			// ) {
			// 	if (
			// 		selectedImage &&
			// 		uploadImage instanceof Response &&
			// 		uploadImage.ok
			// 	) {
			// 		toast('Image uploaded successfully!', {
			// 			icon: '📷',
			// 			style: {
			// 				borderRadius: '10px',
			// 				background: '#333',
			// 				color: '#fff',
			// 			},
			// 		});
			// 	} else if (
			// 		selectedVideo &&
			// 		uploadVideo instanceof Response &&
			// 		uploadVideo.ok
			// 	) {
			// 		toast('Video uploaded successfully!', {
			// 			icon: '🎥',
			// 			style: {
			// 				borderRadius: '10px',
			// 				background: '#333',
			// 				color: '#fff',
			// 			},
			// 		});
			// 	}
			// } else {
			// 	toast.error('Upload failed.');
			// 	return;
			// }

			const uploadedImageData = await uploadImage.json();
			const uploadedVideoData = await uploadVideo.json();
			const imageUrl: string = uploadedImageData.secure_url;
			const videoUrl: string = uploadedVideoData.secure_url;
			const data = { post, imageUrl, videoUrl };
			const registerResponse = await fetch(
				'http://localhost:3000/api/post/create',
				{
					method: 'POST',
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
		<div className='w-96 bg-white rounded-md p-2 shadow-lg'>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<textarea
						className='w-full bg-gray-400/20 text-gray-500 shadow-sm border-gray-400 resize-none h-28 rounded-sm p-2 font-semibold '
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
							onChange={handleVideoChange} // Use the handleVideoChange function for video input
						/>
						<input
							type='file'
							id='file'
							name='file'
							accept='image/*'
							max={16 * 1024 * 1024}
							className='w-full bg-gray-300 text-gray-800 shadow-sm border-gray-400 rounded-md p-2 hidden'
							onChange={handleImageChange} // Use the handleImageChange function for image input
						/>
					</div>
					<button
						type='submit'
						disabled={isLoading}
						className={`${
							isLoading
								? 'cursor-not-allowed bg-gray-100'
								: ' bg-black text-white hover:bg-white hover:text-black'
						} flex py-2 w-40 justify-center rounded-md font-semibold transition-all focus:outline-none`}
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
					<div className='h-32 w-32 border-2 rounded-md shadow-sm'>
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
					<div className='h-32 w-32 border-2 rounded-md shadow-sm'>
						<video
							src={videoPreview}
							width={500}
							height={500}
							className={'aspect-square'}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
