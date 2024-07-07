'use client';
import Link from 'next/link';

// state/actions
// import { deleteDraftSetting } from '@/serverActions/settings/deleteDraftSetting';

// components
import ContextButton from '@/components/buttons/ContextButton';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { nameArray } from '@/utils/nameArray';

const PublishedTemplate = ({ template, products, templateSettings }) => {
	let { types, countries } = mutateTemplateSettings(templateSettings);

	const handleDelete = async (_id) => {
		// await deleteDraftSetting(_id);
	};

	let mutTypes = types?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let mutCountries = countries?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	const type = mutTypes.find((type) => type.id === template.documentType);
	const country = mutCountries.find(
		(country) => country.id === template.origin
	);

	return (
		<>
			<p>{type.name['en'] || ''}</p>
			<p>{country.name['en'] || ''}</p>
			<div className='flex justify-end gap-2'>
				<Link
					href={`/dashboard/laboratory/templates/edit/${template._id}`}
					className='hover:underline text-black'>
					edit
				</Link>
				<ContextButton
					label='delete'
					type='default'
					onClick={() => handleDelete(template._id)}
					classes='self-end'
				/>
			</div>
		</>
	);
};

export default PublishedTemplate;
