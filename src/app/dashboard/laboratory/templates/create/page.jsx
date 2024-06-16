// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getDraftTemplate } from '../../apiCalls';

// components
import TemplateForm from '@/components/templates/TemplateForm';
import TemplateCollection from '@/components/templates/TemplateCollection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templateSettings } = await getTemplateSettings();
	const { draft } = await getDraftTemplate();
	const { languages } = await getLanguages();

	const { setting } = await getLaboratorySettings();
	const { settings } = (await setting) || [];

	// console.log(setting, 'settings in templates');
	// console.log(templateSettings, 'templateSettings');
	// console.log(draft, 'the draft');
	return (
		<div className='w-full'>
			<h2>Create Tempalte</h2>
			<TemplateForm
				languages={languages}
				settings={settings}
				draft={draft}
				templateSettings={templateSettings}
			/>
			{/* <TemplateForm draft={draft} /> */}
			<TemplateCollection draft={draft} />
		</div>
	);
};

export default page;
