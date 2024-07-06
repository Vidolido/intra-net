// state/actions
import {
	getGroups,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getDraftTemplate } from '../../apiCalls';

// components
import TemplateForm from '@/components/templates/TemplateForm';
import TemplateCollection from '@/components/templates/TemplateCollection';
import Template from '@/components/templates/Template';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templateSettings } = await getTemplateSettings();
	const { draft } = await getDraftTemplate();
	const { languages } = await getLanguages();

	const { setting } = await getLaboratorySettings();
	const { settings } = (await setting) || [];

	const { groups } = await getGroups();
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
// return (
//   <div className='w-full'>
//     <h2>Create Tempalte</h2>
//     <TemplateForm
//       languages={languages}
//       settings={settings}
//       draft={draft}
//       groups={groups}
//       templateSettings={templateSettings}
//     />
//     <TemplateCollection draft={draft} />
//   </div>
// );
