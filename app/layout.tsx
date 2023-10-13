// These styles apply to every route in the application
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthStatus from '@/components/auth-status';
import AuthProvider from './context/AuthProvider';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const title = 'Pulse Social App';
const description =
	'A Socail interaction app where intermediate and beginner devs can share thier progress and bugs, while still taking on challenges';

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
			<body className={inter.variable}>
				<Toaster />
				<AuthProvider>{children}</AuthProvider>
				<AuthStatus />
				{children}
			</body>
		</html>
	);
}
