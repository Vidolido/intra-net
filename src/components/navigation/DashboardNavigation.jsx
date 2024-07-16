import Links from './Links';

const links = {
	laboratory: {
		label: 'Laboratory',
		path: '/dashboard/laboratory',
		additionalLinks: [
			{
				label: 'All Documents',
				path: '/dashboard/laboratory/analyses/all',
			},
			{
				label: 'Analyses',
				path: '/dashboard/laboratory/analyses',
			},
			{
				label: 'Templates',
				path: '/dashboard/laboratory/templates',
			},
		],
	},
	administration: {
		label: 'Administration',
		path: '/dashboard/administration',
		additionalLinks: [
			{
				label: 'Vehicles',
				path: '/dashboard/administration/vehicles',
			},
			{
				label: 'Rentals',
				path: '/dashboard/administration/rentals',
			},
		],
	},
	users: {
		label: 'Users',
		path: '/dashboard/admin/users',
	},
	settings: {
		label: 'Settings',
		path: '/dashboard/settings',
	},
};

const DashboardNavigation = () => {
	return (
		<nav
			id='dashboardNav'
			className='flex flex-col w-[130px] h-full bg-[#cf2b2f]'>
			{Object.entries(links).map(([id, link]) => {
				return <Links key={id} link={link} location='dashboard' />;
			})}
		</nav>
	);
};

export default DashboardNavigation;
