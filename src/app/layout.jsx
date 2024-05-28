import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import './globals.css';

export const metadata = {
  title: 'Okta - intra net',
  description: 'Application for internal organization',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <HeaderNavigation />
        {children}
      </body>
    </html>
  );
}
