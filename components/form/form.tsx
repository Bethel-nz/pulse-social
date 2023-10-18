'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { signIn } from 'next-auth/react';
import LoadingDots from '@/components/loading-dots/loading-dots';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function Form({ type }: { type: 'login' | 'register' }) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [selectedImage, setSelectedImage] = useState<File | string>('');
	const [imagePreview, setImagePreview] = useState<string | null>(null); // For displaying the image preview
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			// Display the selected image preview
			const reader = new FileReader();
			reader.onload = (event) => {
				setImagePreview(event?.target?.result as string);
			};
			reader.readAsDataURL(file);

			setSelectedImage(file);
		}
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if (type === 'login') {
			// Login logic
			try {
				await signIn('credentials', {
					email,
					password,
					redirect: false,
					callbackUrl: 'http://localhost:3000',
				});
				toast.success(`Login successful, welcome back ${email}`);
				setTimeout(() => {
					router.refresh();
					router.push('/home');
				}, 1500);
			} catch (error) {
				console.error(error);
				toast.error('Unknown error');
			}
		} else {
			try {
				const image: File | string = selectedImage;
				const formData = new FormData();
				formData.append('file', image);
				formData.append('upload_preset', 'pulse-user');
				const uploadResponse = await fetch(
					'https://api.cloudinary.com/v1_1/pulse-app/image/upload',
					{
						method: 'POST',
						body: formData,
					}
				);
				if (uploadResponse.ok) {
					const uploadedImageData = await uploadResponse.json();
					const imageUrl = uploadedImageData.secure_url;
					const registerData = { name, email, password, image: imageUrl };
					const registerResponse = await fetch(
						'http://localhost:3000/api/auth/register',
						{
							method: 'POST',
							body: JSON.stringify(registerData),
						}
					);
					if (registerResponse.ok) {
						toast.success('Account created! Redirecting to login...');
						setTimeout(() => {
							router.push('/login');
						}, 2000);
					} else {
						const { error } = await registerResponse.json();
						toast.error(error);
					}
				} else {
					toast.error('Please select an image.');
				}
			} catch (error) {
				console.error(error);
				toast.error('Unknown error');
			}
		}
		setLoading(false);
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 relative'
		>
			{type === 'register' && (
				<>
					<div>
						<label
							htmlFor='name'
							className='block text-xs text-gray-600 uppercase'
						>
							username
						</label>
						<input
							id='name'
							name='name'
							type='text'
							placeholder='john doe'
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
						/>
					</div>
					<div className='relative mt-2'>
						<label
							htmlFor='image'
							className='block text-xs text-gray-600 uppercase'
						>
							Upload Profile
						</label>
						<input
							id='file'
							name='file'
							type='file'
							accept='image/*'
							required
							onChange={handleImageChange}
							className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm file:mr-4 file:px-4 file:py-2 file:text-sm file:border-0
            file:rounded-full file:font-semibold file:text-black file:bg-gray-200
            hover:file:bg-black hover:file:text-gray-200 hover:file:cursor-pointer'
						/>
						<div>
							{imagePreview && (
								<div className='absolute right-0 translate-y-1/2 top-0 mt-4 ml-2 w-10'>
									<Image
										src={imagePreview}
										alt='chosen'
										width={500}
										height={500}
										className={'w-8 h-8 object-contain rounded-full'}
									/>
								</div>
							)}
						</div>
					</div>
					<div className='border w-full rounded-md' />
				</>
			)}

			<div>
				<label
					htmlFor='email'
					className='block text-xs text-gray-600 uppercase'
				>
					Email Address
				</label>
				<input
					id='email'
					name='email'
					type='email'
					placeholder='panic@thedis.co'
					autoComplete='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
				/>
			</div>

			<div>
				<label
					htmlFor='password'
					className='block text-xs text-gray-600 uppercase'
				>
					Password
				</label>
				<div className='relative'>
					<input
						id='password'
						name='password'
						placeholder='*******'
						type={showPassword ? 'text' : 'password'}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm pr-10'
					/>
					<button
						type='button'
						onClick={togglePasswordVisibility}
						className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
			</div>

			<button
				disabled={loading}
				className={`${
					loading
						? 'cursor-not-allowed border-gray-200 bg-gray-100'
						: 'border-black bg-black text-white hover:bg-white hover:text-black'
				} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
			>
				{loading ? (
					<LoadingDots color='#808080' />
				) : (
					<p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
				)}
			</button>
			{type === 'login' ? (
				<p className='text-center text-sm text-gray-600'>
					Don&apos;t have an account?{' '}
					<Link href='/register' className='font-semibold text-gray-800'>
						Sign up
					</Link>{' '}
					for free.
				</p>
			) : (
				<p className='text-center text-sm text-gray-600'>
					Already have an account?{' '}
					<Link href='/login' className='font-semibold text-gray-800'>
						Sign in
					</Link>{' '}
					instead.
				</p>
			)}
		</form>
	);
}
