// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getDraftAnalysis, getLaboratoryTemplates } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import Analysis from '@/components/Analyses/Analysis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { setting } = await getLaboratorySettings();
	const { settings } = setting || [];

	const { draft } = await getDraftAnalysis();
	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Analysis
				analysis={draft}
				templateSettings={templateSettings}
				languages={languages}
				settings={settings}
				templates={published}
			/>
		</div>
	);
};

export default page;
