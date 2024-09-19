// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getDocumentById } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';

// components
import SingleDocument from '@/components/Documents/SingleDocument';
import TestReport from '@/components/Documents/SingleDocument/TestReport';

// Don't know if i need them
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

const page = async ({ params }) => {
	let { _id } = params;
	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { document } = await getDocumentById(_id);

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	const { products, types, countries } =
		mutateTemplateSettings(templateSettings);

	// let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);
	let isTestReport =
		documentTypes.find((type) => type._id === document.header.documentType)
			.parameter.inputValue['en'] === 'Test Report';

	if (isTestReport)
		return (
			<TestReport
				document={document}
				products={products}
				settings={settings}
				languages={languages}
			/>
		);

	return (
		<SingleDocument templateSettings={templateSettings} document={document} />
	);
};

export default page;
