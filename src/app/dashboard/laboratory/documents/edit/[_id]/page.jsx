// state/actions
import {
	getCustomers,
	getDocumentById,
	getLaboratoryDocumentNumber,
	getLaboratoryTemplates,
} from '../../../apiCalls';
import {
	getLaboratorySettings,
	getLanguages,
	getSettings,
} from '@/app/dashboard/apiCalls';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
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
const mutFields = (settings) =>
	settings?.map((s) => ({
		_id: s._id,
		...nameArray(s.parameter.inputValue),
	}));

const page = async ({ params }) => {
	const { _id } = params;

	const { customers } = await getCustomers();

	let { languages } = await getLanguages();

	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	let { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	const { document } = await getDocumentById(_id);

	const { laboratoryNumber } = document?.header
		? await getLaboratoryDocumentNumber({
				documentType: document?.header?.documentType,
		  })
		: '';

	let { products, types, countries, fields } = await mutateTemplateSettings(
		templateSettings
	);

	let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);

	let settings = {
		products: mutSettings(products.settings),
		sampleTypes: mutFields(sampleTypes),
		documentTypes: mutFields(documentTypes),
		countries: mutSettings(countries.settings),
		fields: mutateFields(fields.settings),
	};

	let productAliases = products.settings.map((setting) => ({
		_id: setting._id,
		aliases: setting.collections.find(
			(collection) => collection.name.en === 'Aliases'
		).items,
	}));

	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Document
				customers={customers}
				document={document}
				laboratoryNumber={laboratoryNumber}
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
