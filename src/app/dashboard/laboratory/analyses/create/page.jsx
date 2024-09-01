// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getDraftAnalysis, getLaboratoryTemplates } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { nameArray } from '@/utils/nameArray';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';
import { mutateFields } from '@/utils/mutateFields';

// components
import Analysis from '@/components/Analyses/Analysis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const mutSettings = (setting) =>
	setting.settings?.map((s) => ({
		_id: s._id,
		...nameArray(s.parameter.inputValue),
	}));
const mutFields = (settings) =>
	settings?.map((s) => ({
		_id: s._id,
		...nameArray(s.parameter.inputValue),
	}));

const page = async () => {
	let { templateSettings } = await getTemplateSettings();
	let { languages } = await getLanguages();
	let { templates: published } = await getLaboratoryTemplates({
		documentStatus: 'published',
	});

	const { setting } = await getLaboratorySettings();
	const { settings: laboratorySettings } = setting || [];

	const { draft } = await getDraftAnalysis();

	let { products, types, countries, fields, identificationNumbers } =
		await mutateTemplateSettings(templateSettings);

	// console.log(types, 'TYPES');

	let sampleTypes = findSettingType(types.settings, ['sample']);
	let documentTypes = findSettingType(types.settings, ['document']);

	let settings = {
		products: mutSettings(products),
		sampleTypes: mutFields(sampleTypes),
		documentTypes: mutFields(documentTypes),
		countries: mutSettings(countries),
		fields: mutateFields(fields.settings),
		identificationNumbers: mutSettings(identificationNumbers),
	};
	return (
		<div className='w-full'>
			<h2>Create New Document</h2>
			<Analysis
				analysis={draft}
				settings={settings}
				languages={languages}
				laboratorySettings={laboratorySettings}
				templates={published}
			/>
		</div>
	);
};

export default page;
