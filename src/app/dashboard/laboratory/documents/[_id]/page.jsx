// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getCustomers, getDocumentById } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';

// components
import SingleDocument from '@/components/Documents/SingleDocument';
// import TestReport from '@/components/Documents/SingleDocument/TestReport';
// import OtherDocuments from '@/components/Documents/SingleDocument/OtherDocuments';
// import SingleDateCollection from '@/components/Documents/allDocuments/DisplayDocuments/SingleDateCollection';
// import SingleDateCollection from '@/components/Documents/allDocuments/DisplayDocuments/SingleDateCollection';

// Don't know if i need them
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	let { _id } = params;
	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { customers } = await getCustomers();

	const { document } = await getDocumentById(_id);

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	const { products, types, fields, countries } =
		mutateTemplateSettings(templateSettings);

	let productAliases = products.settings.map((setting) => ({
		_id: setting._id,
		aliases: setting.collections.find(
			(collection) => collection.name.en === 'Aliases'
		).items,
	}));

	// let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);

	// let isTestReport =
	// 	documentTypes.find((type) => type._id === document.header.documentType)
	// 		.parameter.inputValue['en'] === 'Test Report';
	return (
		<SingleDocument
			customers={customers}
			document={document}
			documentTypes={documentTypes}
			products={products}
			productAliases={productAliases}
			fields={fields}
			laboratorySettings={laboratorySettings}
			languages={languages}
		/>
	);
};

export default page;
