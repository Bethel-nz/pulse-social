import prisma from '@/prisma/client';
const userFound = async (
	userId: string,
	hasClicked: boolean,
	fn1: (arg: boolean) => void,
	fn2: (arg: boolean) => void
) => {
	const found = await prisma?.heart.findFirst({
		where: {
			userId,
		},
	});
	console.log(found);
	if (found) {
		if (!hasClicked) {
			return fn1(true);
		}
	} else {
		return fn2(false);
	}
};

export default userFound;
