'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftAnalysis } from '@/serverActions/laboratoryAnalyses/makeDraftAnalysis';

// components
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
