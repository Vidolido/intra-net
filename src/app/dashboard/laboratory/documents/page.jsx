// state/actions
// import { getTemplateSettings } from '@/data-access/templates/getTemplateSettings';
import { getSettings } from '../../apiCalls';
import { getLaboratoryDocuments } from '../apiCalls';

// components
import Documents from '@/components/Documents';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	// const { sectors } = await getSectors();

	// const { templateSettings } = await getTemplateSettings();

	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	const { documents: draftDocuments } = await getLaboratoryDocuments({
		documentStatus: 'draft',
	});

	const { documents: publishedDocuments } = await getLaboratoryDocuments({
		documentStatus: 'published',
		sorted: true,
	});

	return (
		<Documents
			templateSettings={templateSettings}
			draftDocuments={draftDocuments}
			publishedDocuments={publishedDocuments}
		/>
	);
};

export default page;
