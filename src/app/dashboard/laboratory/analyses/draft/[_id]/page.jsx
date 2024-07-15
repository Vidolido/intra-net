// state/actions
import {
	getAllTemplates,
	getLaboratorySettings,
	getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getAnalysisById, getDraftAnalysis } from '../../../apiCalls';

// components
import Analysis from '@/components/analyses/Analysis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { _id } = params;

	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { laboratoryTemplates } = await getAllTemplates();

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	// const { draft } = await getDraftAnalysis();
	const { document } = await getAnalysisById(_id);
	// console.log(document, 'document');
	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Analysis
				analysis={document}
				templateSettings={templateSettings}
				languages={languages}
				settings={settings}
				templates={laboratoryTemplates}
			/>
		</div>
	);
};

export default page;
