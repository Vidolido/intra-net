// state/actions
import { getAllTemplates, getLanguages } from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import AnalysesForm from '@/components/analyses/AnalysesForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { laboratoryTemplates } = await getAllTemplates();

	return (
		<div>
			<h2>Create New Document</h2>
			<AnalysesForm
				templateSettings={templateSettings}
				languages={languages}
				templates={laboratoryTemplates}
			/>
		</div>
	);
};

export default page;
