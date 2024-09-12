// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getAnalysisById, getLaboratoryTemplates } from '../../../apiCalls';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { nameArray } from '@/utils/nameArray';
import { findSettingType } from '@/utils/findSettingType';
import { mutateFields } from '@/utils/mutateFields';

// components
import Analysis from '@/components/AnalysesOld/Analysis';

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

const page = async ({ params }) => {
  const { _id } = params;

  let { templateSettings } = await getTemplateSettings();
  let { languages } = await getLanguages();
  let { templates: published } = await getLaboratoryTemplates({
    documentStatus: 'published',
  });

  const { setting } = await getLaboratorySettings();
  const { settings: laboratorySettings } = setting || [];

  const { document } = await getAnalysisById(_id);

  let { products, types, countries, fields, identificationNumbers } =
    await mutateTemplateSettings(templateSettings);

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
        analysis={document}
        settings={settings}
        languages={languages}
        laboratorySettings={laboratorySettings}
        templates={published}
      />
    </div>
  );
};

export default page;
