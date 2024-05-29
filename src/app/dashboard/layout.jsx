import DashboardNavigation from '@/components/navigation/DashboardNavigation';

export const metadata = {
	title: 'Okta - dashboard',
	description: 'Dashboard',
};

export default function RootLayout({ children }) {
	return (
		<main className='flex gap-2 h-[calc(100vh-75px)]'>
			<div>
				<DashboardNavigation />
			</div>
			{children}
		</main>
	);
}
