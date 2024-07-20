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
import Analysis from '@/components/analyses/Analysis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;

	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { templates } = await getLaboratoryTemplates({
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
				templates={templates}
			/>
		</div>
	);
};

export default page;
