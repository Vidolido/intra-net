// state/actions
import { getLaboratoryDraftTemplates } from '../../apiCalls';

// components
import CreateDraftTemplateButton from '@/components/templates/CreateDraftTemplateButton';
import DisplayDraftTemplates from '@/components/templates/draftTemplates/DisplayDraftTemplates';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { draftTemplates } = await getLaboratoryDraftTemplates();

	return (
		<div>
			<h1>Templates</h1>
			<DisplayDraftTemplates drafts={draftTemplates} />
			<CreateDraftTemplateButton />
		</div>
	);
};

export default page;
