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

	const { templateSettings } = await getTemplateSettings();
	const { template } = await getSingleTemplate(_id);

	const { languages } = await getLanguages();

	const { setting } = await getLaboratorySettings();

	const { groups } = await getGroups();

	return (
		<Template
			title='Edit Draft Template'
			languages={languages}
			setting={setting}
			template={template}
			groups={groups}
			templateSettings={templateSettings}
		/>
	);
};

export default page;
