import toast from 'react-hot-toast';
import { ChangeEvent } from 'react';

export const handleFileChange = (
	e: ChangeEvent<HTMLInputElement>,
	MAX_FILE_SIZE: number,
	setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>,
	setPreview: React.Dispatch<React.SetStateAction<string>>
) => {
	const file = e.target.files?.[0];

	if (file && file.size <= MAX_FILE_SIZE) {
		const reader = new FileReader();

		reader.onload = (event) => {
			setPreview(event?.target?.result as string);
		};

		reader.readAsDataURL(file);
		setSelectedFile(file);
	} else {
		toast.error('File size exceeds 16MB');
	}
};
