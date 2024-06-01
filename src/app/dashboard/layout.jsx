import DashboardNavigation from '@/components/navigation/DashboardNavigation';
import { SettingsContextProvider } from '@/state/settingsContext';

export const metadata = {
	title: 'Okta - Dashboard',
	description: 'Dashboard',
};

export default function RootLayout({ children }) {
	return (
		<main className='flex gap-2 h-[calc(100vh-75px)]'>
			<SettingsContextProvider>
				<div>
					<DashboardNavigation />
				</div>
				{children}
			</SettingsContextProvider>
		</main>
	);
}
