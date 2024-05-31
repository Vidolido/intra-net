// import SettingsForm from '@/components/settings/SettingsForm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = () => {
  return (
    <div>
      Settings
      {/* <SettingsForm /> */}
      <Link
        href='/dashboard/settings/add'
        className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
        Add New Setting{' '}
      </Link>
    </div>
  );
};

export default page;
