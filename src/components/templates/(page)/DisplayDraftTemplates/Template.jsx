'use client';
import Link from 'next/link';

// state/actions
import { deleteDraftTemplate } from '@/serverActions/laboratoryTemplates/deleteDraftTemplate';

// components
import ContextButton from '@/components/buttons/ContextButton';
import { deleteTemplate } from '@/serverActions/laboratoryTemplates/deleteTemplate';

const Template = ({ draft }) => {
	const handleDelete = async (_id) => {
		// await deleteDraftTemplate(_id);
		await deleteTemplate(_id, 'draft');
	};
	return (
		<div className='flex gap-2 justify-between p-2'>
			<Link
				key={draft?._id}
				href={`/dashboard/laboratory/templates/draft/${draft._id}`}>
				<h5>{draft?._id}</h5>
			</Link>
			<ContextButton
				label='Delete'
				type='edit'
				onClick={() => handleDelete(draft._id)}
			/>
		</div>
	);
};

export default Template;
