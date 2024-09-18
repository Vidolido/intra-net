// state/actions
import {
  getCustomers,
  getDraftDocument,
  getLaboratoryTemplates,
} from '../../apiCalls';
import {
  getLaboratorySettings,
  getLanguages,
  getSectors,
  getSettings,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';
import { mutateFields } from '@/utils/mutateFields';
import { nameArray } from '@/utils/nameArray';

// components
import Document from '@/components/Documents/Document';

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
  // let { templateSettings } = await getTemplateSettings();
  //   const { sectors } = await getSectors();
  const { customers } = await getCustomers();

  const { settings: templateSettings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  });

  let { languages } = await getLanguages();
  let { templates: published } = await getLaboratoryTemplates({
    documentStatus: 'published',
  });

  const { setting } = await getLaboratorySettings();
  const { settings: laboratorySettings } = setting || [];

  const { draft } = await getDraftDocument();

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
  console.log(
    templateSettings.find((sett) => sett.settingName === 'Types'),
    'template settings'
  );

  return (
    <div className='w-full'>
      <h2>Create New Document</h2>
      <Document
        customers={customers}
        document={draft}
        settings={settings}
        languages={languages}
        laboratorySettings={laboratorySettings}
        templates={published}
      />
    </div>
  );
};

export default page;
