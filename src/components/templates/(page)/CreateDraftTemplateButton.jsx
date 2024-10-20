'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftTemplate } from '@/data-access/templates/makeDraftTemplate';

// components
import ErrorMsg from '@/components/reusable/ErrorMsg';

const CreateDraftTemplateButton = ({ schemaNames }) => {
	const [actionStatus, setActionStatus] = useState({
		error: null,
		success: null,
	});
	const router = useRouter();

	const handdleClick = async () => {
		const { error, success } = await makeDraftTemplate(schemaNames);
		setActionStatus({ error: error || null, success: success || null });
		router.push(`/dashboard/laboratory/templates/create?_id=${success._id}`);
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
				Create New Template
			</button>
		</>
	);
};

export default CreateDraftTemplateButton;
