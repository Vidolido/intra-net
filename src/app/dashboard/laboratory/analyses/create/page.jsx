// state/actions
import {
	getAllTemplates,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import AnalysesForm from '@/components/analyses/AnalysesForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { laboratoryTemplates } = await getAllTemplates();

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<AnalysesForm
				templateSettings={templateSettings}
				languages={languages}
				settings={settings}
				templates={laboratoryTemplates}
			/>
		</div>
	);
};

export default page;
