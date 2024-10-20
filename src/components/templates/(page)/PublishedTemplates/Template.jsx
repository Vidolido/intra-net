'use client';

// state/actions
import { deleteTemplate } from '@/serverActions/laboratoryTemplates/deleteTemplate';

// components
import Options from '@/components/options/Options'; // might delete or refactor

const Template = ({ template, data }) => {
	const handleDelete = async (_id) => {
		// console.log(_id, 'DELETE ITEM');
		// await deleteDraftSetting(_id);
		await deleteTemplate(_id, 'published');
	};
	const documentType = data?.types?.settings.find(
		(type) => type._id === template?.header?.documentType
	);
	const sampleType =
		data.types?.settings.find(
			(type) => type._id === template?.header?.sampleType
		) || 'none';

	const country = data.countries?.settings.find(
		(country) => country._id === template?.header?.origin
	);

	return (
		<>
			<p className='pl-1 border-l border-transparent'>
				{documentType?.parameter['en'] || '--'}
			</p>
			<p className='pl-1 border-l border-slate-300'>
				{country?.parameter['en'] || '--'}
			</p>
			<p className='pl-1 border-l border-slate-300'>
				{sampleType !== 'none' ? sampleType?.parameter['en'] : '--'}
			</p>
			<div className='border-l border-slate-300 relative'>
				<Options
					_id={template._id}
					edit={{
						show: true,
						link: '/dashboard/laboratory/templates/edit/',
						classes: 'hover:underline text-black',
					}}
					deleteItem={{
						show: true,
						type: 'default',
						onClick: handleDelete,
						classes: 'self-end',
					}}
				/>
			</div>
		</>
	);
};

export default Template;
