import Links from './Links';

// const links = [
//   {
//     title: {
//       en: 'Analyses',
//       mk: 'Анализи',
//       gr: 'Ανάλυση',
//     },
//     path: 'analyses',
//   },
//   {
//     title: {
//       en: 'Templates',
//       mk: 'Шаблони',
//       gr: 'Πρότυπα',
//     },
//     path: 'templates',
//   },
//   {
//     title: {
//       en: 'Settings',
//       mk: 'Подесувања',
//       gr: 'Ρυθμίσεις',
//     },
//     path: 'settings',
//   },
// ];

const links = {
  laboratory: {
    label: 'Laboratory',
    path: '/dashboard/laboratory',
  },
  vehicleList: {
    label: 'Vehicles',
    path: '/dashboard/administration/vehicles',
  },
  userList: {
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
    <div
      id='dashboardNav'
      className='flex flex-col w-[130px] bg-[#cf2b2f] divide-y-4 divide-[#cf2b2f]'>
      {Object.entries(links).map(([id, link]) => {
        return <Links key={id} link={link} />;
      })}
    </div>
  );
};

export default DashboardNavigation;
