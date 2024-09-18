// state/actions
import { getLaboratoryTemplates } from '../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { nameArray } from '@/utils/nameArray';

// components
import Templates from '@/components/Templates';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const mutSettings = (setting) =>
	setting.settings?.map((s) => ({
		id: s._id,
		...nameArray(s.parameter.inputValue),
	}));

const page = async () => {
	const { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
		isDeleted: false,
	});
	const { templates: draftTemplates } = await getLaboratoryTemplates({
		documentStatus: 'draft',
		sorted: true,
	});
	const { templateSettings } = await getTemplateSettings();

	const { products, countries, types } = await mutateTemplateSettings(
		templateSettings
	);

	let settings = {
		products: mutSettings(products),
		types: mutSettings(types),
		countries: mutSettings(countries),
	};
	console.log(types, 'the  types');
	return (
		<Templates
			published={published}
			drafts={draftTemplates}
			settings={settings}
		/>
	);
};

export default page;
