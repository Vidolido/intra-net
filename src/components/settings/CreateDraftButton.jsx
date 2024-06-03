'use client';
import Link from 'next/link';

// state/actions
import { makeDraftSetting } from '@/serverActions/settings/makeDraftSetting';

const CreateDraftButton = () => {
	return (
		<Link
			href='/dashboard/settings/add'
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
			onClick={async () => makeDraftSetting()}>
			Add New Setting
		</Link>
	);
};

export default CreateDraftButton;
