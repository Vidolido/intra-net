// state/actions
import { getLaboratoryTemplates } from '../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { nameArray } from '@/utils/nameArray';

// components
import CreateDraftTemplateButton from '@/components/templates/CreateDraftTemplateButton';
import DisplayDraftTemplates from '@/components/templates/draftTemplates/DisplayDraftTemplates';
import PublishedTemplates from '@/components/templates/publishedTemplates/PublishedTemplates';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});
	const { templates: draftTemplates } = await getLaboratoryTemplates({
		documentStatus: 'draft',
	});
	const { templateSettings } = await getTemplateSettings();

	let products = templateSettings.filter(
		(setting) => setting.settingName === 'Products'
	);

	let items = products[0]?.settings?.map((setting) => ({
		id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	return (
		<div className='w-full pr-2'>
			<CreateDraftTemplateButton />
			<div className='flex justify-between w-full'>
				<PublishedTemplates
					published={published}
					products={items}
					templateSettings={templateSettings}
				/>
				<DisplayDraftTemplates drafts={draftTemplates} />
			</div>
		</div>
	);
};

export default page;
