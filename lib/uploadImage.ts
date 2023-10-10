import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
	cloud_name: 'dw7jrexco',
	api_key: '472335312523778',
	api_secret: 'fYtPlt9Mmo-wg0DxpYPBUzclhH8',
});

export const uploadImage = async (
	image: string | File | null,
	email: string
): Promise<string | null> => {
	if (!image) {
		return null;
	}

	try {
		if (typeof image === 'string') {
			// If the image is already a URL (string), return it directly.
			return image;
		} else {
			// If the image is a File, upload it to Cloudinary.
			const uploadResult = await cloudinary.uploader.upload(`${image}`, {
				folder: 'profile-images',
				tags: 'pulse-social-users',
				public_id: `${email}-profile`,
			});

			return uploadResult.secure_url;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};
