'use client';
import Link from 'next/link';

// state/actions
import { deleteDraftSetting } from '@/serverActions/settings/deleteDraftSetting';

// components
import ContextButton from '@/components/buttons/ContextButton';

const PublishedSetting = ({ setting }) => {
	const handleDelete = async (_id) => {
		await deleteDraftSetting(_id);
	};
	return (
		<>
			<h5>{setting?.settingName}</h5>
			<div className='flex gap-2'>
				<Link
					href={`/dashboard/settings/edit/${setting._id}`}
					className='hover:underline text-black'>
					edit
				</Link>
				<ContextButton
					label='delete'
					type='default'
					onClick={() => handleDelete(setting._id)}
					classes='self-end'
				/>
			</div>
		</>
	);
};

export default PublishedSetting;
