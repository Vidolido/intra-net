import DashboardNavigation from '@/components/navigation/DashboardNavigation';

export const metadata = {
  title: 'Okta - dashboard',
  description: 'Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <main className='flex min-h-screen gap-2'>
      <DashboardNavigation />
      {children}
    </main>
  );
}
