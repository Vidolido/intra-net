import Link from 'next/link';
import Image from 'next/image';

// import Logo from

// components
import Links from './Links';

const links = {
  home: {
    label: 'Overview',
    path: '/',
  },
  carPool: {
    label: 'Car Pool',
    path: '/car-pool',
  },
  dashboard: {
    label: 'Dashboard',
    path: '/dashboard',
  },
  login: {
    label: 'Login',
    path: '/login',
  },
};

const HeaderNavigation = () => {
  return (
    <header className='flex justify-between p-1'>
      {/* <div>Logo</div> */}
      <Link href='/'>
        <Image width={200} height={60} src='/logo.png' />
      </Link>
      <nav className='flex justify-between gap-2 p-5'>
        {Object.entries(links).map(([id, link]) => {
          return <Links key={id} link={link} />;
        })}
      </nav>
    </header>
  );
};

export default HeaderNavigation;
