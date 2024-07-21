// state/actions
import { getAnalysisById } from '../../apiCalls';
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import SingleDocument from '@/components/analyses/viewDocument/SingleDocument';

const page = async ({ params }) => {
	let { _id } = params;
	const { templateSettings } = await getTemplateSettings();
	const { document } = await getAnalysisById(_id);

	const { languages } = await getLanguages();

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	let products = templateSettings.find(
		(setting) => setting.settingName === 'Products'
	);

	return (
		<SingleDocument
			document={document}
			products={products}
			settings={settings}
			languages={languages}
		/>
	);
};

export default page;
