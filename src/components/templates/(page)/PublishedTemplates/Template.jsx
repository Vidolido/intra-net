'use client';

// state/actions
import { deleteTemplate } from '@/serverActions/laboratoryTemplates/deleteTemplate';

// components
import Options from '@/components/options/Options'; // might delete or refactor

const Template = ({ template, settings }) => {
	const handleDelete = async (_id) => {
		console.log(_id, 'DELETE ITEM');
		// await deleteDraftSetting(_id);
		await deleteTemplate(_id, 'published');
	};

	const documentType = settings.types.find(
		(type) => type.id === template.documentType
	);
	const sampleType =
		settings.types.find((type) => type.id === template.sampleType) || 'none';

	const country = settings.countries.find(
		(country) => country.id === template.origin
	);
	return (
		<>
			<p className='pl-1 border-l border-transparent'>
				{documentType?.name['en'] || '--'}
			</p>
			<p className='pl-1 border-l border-slate-300'>
				{country?.name['en'] || '--'}
			</p>
			<p className='pl-1 border-l border-slate-300'>
				{sampleType !== 'none' ? sampleType?.name['en'] : '--'}
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
