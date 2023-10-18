// These styles apply to every route in the application
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Provider from './context/provider';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const title = 'Pulse App';
const description =
	'A Social interaction app where intermediate and beginner devs can share thier progress and bugs, while still taking on challenges';

export const metadata: Metadata = {
	title,
	description,
	twitter: {
		card: 'summary_large_image',
		title,
		description,
	},
	metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
	themeColor: '#FFF',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} h-dynamic bg-light`}>
				<Toaster />
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
