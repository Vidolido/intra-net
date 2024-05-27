import Links from './Links';

const links = {
	home: {
		label: 'Overview',
		path: '/',
	},
	carPool: {
		label: 'Car Pool',
		path: '/carpool',
	},
	// profile: {
	// 	label: 'Profile',
	// 	path: '/dashboard/profile',
	// },
	vehicleList: {
		label: 'Vehicles',
		path: '/dashboard/vehicleList',
	},
	userList: {
		label: 'Users',
		path: '/dashboard/userList',
	},
	login: {
		label: 'Login',
		path: '/login',
	},
};
const HeaderNavigation = () => {
	return (
		<header className='flex justify-between'>
			<div>Logo</div>
			<nav className='flex justify-between gap-2 p-5'>
				{Object.entries(links).map(([id, link]) => {
					return <Links key={id} link={link} />;
				})}
			</nav>
		</header>
	);
};

export default HeaderNavigation;
