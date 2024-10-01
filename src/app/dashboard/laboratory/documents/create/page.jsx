// state/actions
import {
	getCustomers,
	getDraftDocument,
	getLaboratoryTemplates,
} from '../../apiCalls';
import {
	getLaboratorySettings,
	getLanguages,
	getSettings,
} from '@/app/dashboard/apiCalls';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';
import { mutateFields } from '@/utils/documents/mutateFields';
import { nameArray } from '@/utils/nameArray';

// components
import Document from '@/components/Documents/Document';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const mutSettings = (settings) =>
	settings?.map((s) => ({
		_id: s._id,
		...nameArray(s.parameter.inputValue),
	}));

const page = async () => {
	const { customers } = await getCustomers();

	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	let { languages } = await getLanguages();
	let { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	const { draft } = await getDraftDocument();

	let { products, types, countries, fields } = await mutateTemplateSettings(
		templateSettings
	);

	let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);

	let settings = {
		products: mutSettings(products.settings),
		sampleTypes: mutSettings(sampleTypes),
		documentTypes: mutSettings(documentTypes),
		countries: mutSettings(countries.settings),
		fields: mutateFields(fields.settings),
	};

	let productAliases = products.settings.map((setting) => ({
		_id: setting._id,
		aliases: setting.collections.find(
			(collection) => collection.name.en === 'Aliases'
		).items,
	}));

	// console.log(
	// 	products.settings[0].collections.find(
	// 		(collection) => collection.name.en === 'Aliases'
	// 	).items,
	// 	'Aliases simple'
	// );
	// console.log(productAliases[0], 'productAliases');
	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Document
				customers={customers}
				document={draft}
				settings={settings}
				productAliases={productAliases}
				languages={languages}
				laboratorySettings={laboratorySettings}
				templates={published}
			/>
		</div>
	);
};

export default page;
