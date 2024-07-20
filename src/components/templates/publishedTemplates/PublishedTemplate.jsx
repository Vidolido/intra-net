'use client';

// state/actions
import { deleteTemplate } from '@/serverActions/laboratoryTemplates/deleteTemplate';
import { nameArray } from '@/utils/nameArray';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import Options from '@/components/options/Options';

const PublishedTemplate = ({ template, products, templateSettings }) => {
	let { types, countries } = mutateTemplateSettings(templateSettings);

	const handleDelete = async (_id) => {
		console.log(_id, 'DELETE ITEM');
		// await deleteDraftSetting(_id);
		await deleteTemplate(_id, 'published');
	};

	let mutTypes = types?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	let mutCountries = countries?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	const documentType = mutTypes.find(
		(type) => type.id === template.documentType
	);
	const sampleType =
		mutTypes.find((type) => type.id === template.sampleType) || 'none';
	const country = mutCountries.find(
		(country) => country.id === template.origin
	);
	return (
		<>
			<p className='pl-1 border-l border-transparent'>
				{documentType.name['en'] || ''}
			</p>
			<p className='pl-1 border-l border-slate-300'>
				{country.name['en'] || ''}
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

export default PublishedTemplate;
