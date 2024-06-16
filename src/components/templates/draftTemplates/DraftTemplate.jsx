'use client';
import Link from 'next/link';

// state/actions
import { deleteDraftTemplate } from '@/serverActions/laboratoryTemplates/deleteDraftTemplate';

// components
import ContextButton from '@/components/buttons/ContextButton';

const DraftTemplate = ({ draft }) => {
	const handleDelete = async (_id) => {
		await deleteDraftTemplate(_id);
	};
	return (
		<div className='flex gap-2 justify-between border-2 border-slate-200 hover:border-red-200 p-2'>
			<Link
				key={draft?._id}
				href={`/dashboard/laboratory/templates/draft/${draft._id}`}>
				<h5>{draft?._id}</h5>
				<p>{draft?.settingName}</p>
			</Link>
			<ContextButton
				label='Delete'
				type='edit'
				onClick={() => handleDelete(draft._id)}
			/>
		</div>
	);
};

export default DraftTemplate;
