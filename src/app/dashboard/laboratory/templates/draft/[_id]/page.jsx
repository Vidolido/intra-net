// state/actions
import {
	getGroups,
	getLaboratoryDraftById,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import TemplateForm from '@/components/templates/TemplateForm';
import TemplateCollection from '@/components/templates/TemplateCollection';
import Template from '@/components/templates/Template';
// import Template from '@/components/templates/template/Template';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;
	const { draft } = await getLaboratoryDraftById(_id);
	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	const { groups } = await getGroups();

	//   console.log(groups, 'THE GROUPS');

	return (
		<Template
			title='Edit Draft Template'
			languages={languages}
			settings={settings}
			template={draft}
			groups={groups}
			templateSettings={templateSettings}
		/>
	);
};

export default page;
