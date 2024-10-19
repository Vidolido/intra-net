// state/actions
import { getLaboratoryTemplates } from '../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';

// components
import Templates from '@/components/Templates';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
		isDeleted: false,
	});
	const { templates: draftTemplates } = await getLaboratoryTemplates({
		documentStatus: 'draft',
		sorted: true,
	});
	const { templateSettings } = await getTemplateSettings();

	const { products, countries, types } = await mutateTemplateSettings(
		templateSettings
	);

	let data = {
		products,
		types,
		countries,
	};
	return (
		<Templates published={published} drafts={draftTemplates} data={data} />
	);
};

export default page;
