// state/actions
import { getLaboratoryTemplates } from '../apiCalls';
import { getSettings } from '../../apiCalls';
// import { getTemplateSettings } from '@/data-access/templates/getTemplateSettings';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';

// components
import Templates from '@/components/Templates';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { templates: published } = await getLaboratoryTemplates({
    documentStatus: 'published',
    isDeleted: false,
  });
  const { templates: draftTemplates } = await getLaboratoryTemplates({
    documentStatus: 'draft',
    sorted: true,
  });
  // const { templateSettings } = await getTemplateSettings();
  const { settings: templateSettings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  });

  const { products, countries, types, laboratoryTemplates } =
    await mutateTemplateSettings(templateSettings);

  let data = {
    products,
    types,
    countries,
    schemaNames: laboratoryTemplates?.optionsSchema,
  };

  return (
    <Templates published={published} drafts={draftTemplates} data={data} />
  );
};

export default page;
