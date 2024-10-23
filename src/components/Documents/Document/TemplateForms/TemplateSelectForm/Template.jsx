'use client';

// state/actions
import { deleteTemplate } from '@/serverActions/laboratoryTemplates/deleteTemplate';

// components
import Options from '@/components/options/Options'; // might delete or refactor

const Template = ({ template, settings }) => {
	const handleDelete = async (_id) => {
		// console.log(_id, 'DELETE ITEM');
		// await deleteDraftSetting(_id);
		await deleteTemplate(_id, 'published');
	};
	// console.log(settings, 'the settings');
	const documentType = settings.documentTypes.find(
		(type) => type._id === template?.header?.documentType
	);
	const sampleType =
		settings.sampleTypes?.find(
			(type) => type._id === template?.header?.sampleType
		) || 'none';

	const country = settings.countries?.find(
		(country) => country._id === template?.header?.origin
	);
	// console.log(documentType, sampleType, country, 'OVOJ settings');
	// console.log(documentType, 'documentType');
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
		</>
	);
};

export default Template;
