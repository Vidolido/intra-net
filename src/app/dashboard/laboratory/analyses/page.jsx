// state/actions
import { getLaboratoryDocuments } from '../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { nameArray } from '@/utils/nameArray';

// components
import Analyses from '../../../../../oldFiles/AnalysesOld';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templateSettings } = await getTemplateSettings();

	const { documents: draftDocuments } = await getLaboratoryDocuments({
		documentStatus: 'draft',
	});

	const { documents: publishedDocuments } = await getLaboratoryDocuments({
		documentStatus: 'published',
		sorted: true,
	});

	let products = templateSettings.filter(
		(setting) => setting.settingName === 'Products'
	);

	let mutProducts = products[0]?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	return (
		<Analyses
			templateSettings={templateSettings}
			draftDocuments={draftDocuments}
			publishedDocuments={publishedDocuments}
			products={mutProducts}
		/>
	);
};

export default page;
