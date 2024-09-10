'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftDocument } from '@/data-access/documents/makeDraftDocument';

// components
import ContextButton from '@/components/buttons/ContextButton';

const CreateDraftDocuments = () => {
	const router = useRouter();

	const handdleClick = async (e) => {
		await makeDraftDocument();
		router.push('/dashboard/laboratory/documents/create');
	};

	return (
		<ContextButton
			label='Create New Document'
			type='edit'
			onClick={handdleClick}
		/>
	);
};

export default CreateDraftDocuments;
