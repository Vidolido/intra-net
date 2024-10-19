'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftSetting } from '@/data-access/settings/makeDraftSetting';
import { useState } from 'react';

// components
import ErrorMsg from '@/components/reusable/ErrorMsg';

const CreateDraftButton = () => {
	const [actionStatus, setActionStatus] = useState({
		error: null,
		success: null,
	});
	const router = useRouter();

	const handdleClick = async (e) => {
		const { error, success } = await makeDraftSetting();
		router.push(`/dashboard/settings/create?_id=${success._id}`);
	};

	return (
		<>
			{actionStatus?.error?.document && (
				<ErrorMsg msg={actionStatus?.error?.document} />
			)}
			<button
				type='button'
				onClick={handdleClick}
				className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
				Add New Setting
			</button>
		</>
	);
};

export default CreateDraftButton;
