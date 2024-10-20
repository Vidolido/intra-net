// state/actions
import {
	getGroups,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/data-access/templates/getTemplateSettings';
import { getSingleTemplate } from '../../../apiCalls';

// components
import Template from '@/components/Templates/Template';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;
	const { template } = await getSingleTemplate(_id);
	const { templateSettings } = await getTemplateSettings();
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
