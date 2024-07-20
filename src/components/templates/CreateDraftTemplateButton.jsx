'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftTemplate } from '@/serverActions/laboratoryTemplates/makeDraftTemplate';

const CreateDraftTemplateButton = () => {
	const router = useRouter();

	const handdleClick = async () => {
		await makeDraftTemplate();
		router.push('/dashboard/laboratory/templates/create');
	};
	return (
		<button
			type='button'
			onClick={handdleClick}
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
			Create New Template
		</button>
	);
};

export default CreateDraftTemplateButton;
