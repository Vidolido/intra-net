'use client';
import Link from 'next/link';

// state/actions
import { deleteSettingDocument } from '@/serverActions/settings/deleteSettingDocument';

// components
import ContextButton from '@/components/buttons/ContextButton';

const Setting = ({ setting }) => {
	const handleDelete = async (_id) => {
		await deleteSettingDocument(_id, 'published');
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

export default Setting;
