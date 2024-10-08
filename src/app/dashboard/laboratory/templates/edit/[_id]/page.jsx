// state/actions
import {
	getGroups,
	getLaboratoryDraftById,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import Template from '@/components/Templates/Template';
import { getSingleTemplate } from '../../../apiCalls';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;
	const { draft } = await getLaboratoryDraftById(_id);
	const { template } = await getSingleTemplate(_id); // ova go smeniv so draft
	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	const { groups } = await getGroups();

	// console.log(template, 'the template');
	return (
		<Template
			title='Edit Draft Template'
			languages={languages}
			settings={settings}
			template={template}
			groups={groups}
			templateSettings={templateSettings}
		/>
	);
};

export default page;
