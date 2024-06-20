// state/context
import { getDraftSettings } from '../apiCalls';

// components
import CreateDraftButton from '@/components/settings/CreateDraftButton';
import DisplayDraftSettings from '@/components/settings/draftSettings/DisplayDraftSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { draftSettings } = await getDraftSettings();
	return (
		<div>
			Settings
			<DisplayDraftSettings drafts={draftSettings} />
			<CreateDraftButton />
		</div>
	);
};

export default page;
