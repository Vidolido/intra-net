// state/actions

// components
import { getAllTemplates, getLanguages } from '@/app/dashboard/apiCalls';
import AnalysesForm from '@/components/analyses/AnalysesForm';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { laboratoryTemplates } = await getAllTemplates();

	// console.log(templateSettings, 'templateSettings');
	// templateSettings = JSON.parse(JSON.stringify(templateSettings));
	// console.log(templateSettings, 'templateSettings');
	return (
		<div>
			<h2>Create New Document</h2>
			<AnalysesForm
				templateSettings={templateSettings}
				languages={languages}
				allTemplates={laboratoryTemplates}
			/>
		</div>
	);
};

export default page;
