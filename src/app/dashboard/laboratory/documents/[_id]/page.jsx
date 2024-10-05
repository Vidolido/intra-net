// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getDocumentById } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';

// components
import SingleDocument from '@/components/Documents/SingleDocument';
import TestReport from '@/components/Documents/SingleDocument/TestReport';
import OtherDocuments from '@/components/Documents/SingleDocument/OtherDocuments';
import SingleDateCollection from '@/components/Documents/allDocuments/DisplayDocuments/SingleDateCollection';
// import SingleDateCollection from '@/components/Documents/allDocuments/DisplayDocuments/SingleDateCollection';

// Don't know if i need them
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

const page = async ({ params }) => {
	let { _id } = params;
	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { document } = await getDocumentById(_id);

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	const { products, types, countries } =
		mutateTemplateSettings(templateSettings);

	// let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);

	// let isTestReport =
	// 	documentTypes.find((type) => type._id === document.header.documentType)
	// 		.parameter.inputValue['en'] === 'Test Report';
	return (
		<SingleDocument
			document={document}
			documentTypes={documentTypes}
			products={products}
			laboratorySettings={laboratorySettings}
			languages={languages}
		/>
	);

	// if (isTestReport)
	//   return (
	//     <TestReport
	// document={document}
	// products={products}
	// settings={settings}
	// languages={languages}
	//     />
	//   );

	// return (
	//   <OtherDocuments
	//     document={document}
	//     products={products}
	//     settings={settings}
	//     languages={languages}
	//   />
	// );
};

export default page;
