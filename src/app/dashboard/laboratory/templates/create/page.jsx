// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getDraftTemplate } from '../../apiCalls';

// components
import TemplateForm from '@/components/templates/TemplateForm';

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
	return (
		<div className='w-full'>
			<h2>Create Tempalte</h2>
			<TemplateForm
				languages={languages}
				settings={settings}
				draft={draft}
				templateSettings={templateSettings}
			/>
		</div>
	);
};

export default page;
