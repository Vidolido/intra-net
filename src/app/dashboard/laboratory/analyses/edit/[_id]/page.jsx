// state/actions
import {
	getAllTemplates,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import {
	getAnalysisById,
	getDraftAnalysis,
	getLaboratoryTemplates,
} from '../../../apiCalls';

// components
import Analysis from '@/components/Analyses/Analysis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;

	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	// let { laboratoryTemplates } = await getAllTemplates();
	let { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	const { document } = await getAnalysisById(_id);
	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Analysis
				analysis={document}
				templateSettings={templateSettings}
				languages={languages}
				settings={settings}
				templates={published}
			/>
		</div>
	);
};

export default page;
