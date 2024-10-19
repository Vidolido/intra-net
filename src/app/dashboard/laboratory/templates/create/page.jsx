// state/actions
import {
	getGroups,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getDraftTemplate, getSingleTemplate } from '../../apiCalls';

// components
import Template from '@/components/Templates/Template';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ searchParams }) => {
	const { _id } = searchParams;

	const { templateSettings } = await getTemplateSettings();
	// const { draft } = await getDraftTemplate(); // јавува грешка доколку е на create/page.js
	const { template } = await getSingleTemplate(_id); // ova go smeniv so draft

	const { languages } = await getLanguages();

	const { setting } = await getLaboratorySettings();
	const { settings } = (await setting) || []; // Да прверам дали враќа undefind|null

	const { groups } = await getGroups();
	// console.log(setting, 'setting');
	// console.log(template, 'ovoa');
	// console.log(groups, 'groups');
	// console.log(draft, 'the draft');
	// console.log(templateSettings, 'template settings');
	return (
		<>
			<Template
				title='Edit Draft Template'
				languages={languages}
				settings={settings}
				template={template}
				groups={groups}
				templateSettings={templateSettings}
			/>
		</>
	);
};

export default page;
