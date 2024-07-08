'use client';

import { makeDraftAnalysis } from '@/serverActions/laboratoryAnalyses/makeDraftAnalysis';
// state/actions
// import { makeDraftSetting } from '@/serverActions/settings/makeDraftSetting';
import { useRouter } from 'next/navigation';
import ContextButton from '../buttons/ContextButton';

const CreateDraftAnalysis = () => {
	const router = useRouter();

	const handdleClick = async (e) => {
		await makeDraftAnalysis();
		router.push('/dashboard/laboratory/analyses/create');
	};

	return (
		<ContextButton
			label='Create New Analysis'
			type='edit'
			onClick={handdleClick}
		/>
	);
};

export default CreateDraftAnalysis;
