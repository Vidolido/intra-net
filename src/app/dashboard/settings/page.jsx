import Link from 'next/link';

// state/context
import { getDraftSettings } from '../apiCalls';

// components
// import SettingsForm from '@/components/settings/SettingsForm';
import CreateDraftButton from '@/components/settings/CreateDraftButton';
import DisplayDraftSettings from '@/components/settings/draftSettings/DisplayDraftSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { draftSettings } = await getDraftSettings();
	return (
		<div>
			Settings
			{/* <SettingsForm /> */}
			<DisplayDraftSettings drafts={draftSettings} />
			<CreateDraftButton />
			{/* <Link
        href='/dashboard/settings/add'
        className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
        Add New Setting{' '}
      </Link> */}
		</div>
	);
};

export default page;
