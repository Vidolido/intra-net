// state/actions
import {
	getGroups,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getSingleTemplate } from '@/app/dashboard/laboratory/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import Template from '@/components/Templates/Template';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;
	const { template } = await getSingleTemplate(_id);

	const { languages } = await getLanguages();
	const { templateSettings } = await getTemplateSettings();

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	const { groups } = await getGroups();

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
