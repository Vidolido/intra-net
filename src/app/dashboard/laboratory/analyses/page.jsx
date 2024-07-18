// state/actions
import { getLaboratoryDocuments } from '../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { nameArray } from '@/utils/nameArray';

// components
import CreateDraftAnalysis from '@/components/analyses/CreateDraftAnalyses';
import DisplayDraftDocuments from '@/components/analyses/documentsPage/DisplayDraftDocuments';
import LastAddedDocuments from '@/components/analyses/documentsPage/LastAddedDocuments';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templateSettings } = await getTemplateSettings();

	const { documents: draftDocuments } = await getLaboratoryDocuments({
		documentStatus: 'draft',
	});

	const { documents: publishedDocuments } = await getLaboratoryDocuments({
		documentStatus: 'published',
		sorted: true,
	});

	let products = templateSettings.filter(
		(setting) => setting.settingName === 'Products'
	);

	let items = products[0]?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	return (
		<div className='w-full pr-4'>
			<CreateDraftAnalysis />
			<h2>Analyses</h2>
			<div className='flex justify-between w-full'>
				<LastAddedDocuments
					documents={publishedDocuments}
					templateSettings={templateSettings}
					products={items}
				/>
				<DisplayDraftDocuments documents={draftDocuments} />
			</div>
		</div>
	);
};

export default page;
