// state/actions
import {
  getGroups,
  getLaboratoryDraftById,
  getLaboratorySettings,
  getLanguages,
} from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import TemplateForm from '@/components/templates/TemplateForm';
import TemplateCollection from '@/components/templates/TemplateCollection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ДА ГИ СМЕНАМ СИТЕ НАЗИВИ ИЛИ ДА ЈА ПРЕПРАВАМ ОВАА КОМПОНЕНТА
const page = async ({ params }) => {
  const { _id } = params;
  const { draft } = await getLaboratoryDraftById(_id);
  const { languages } = await getLanguages();
  const { templateSettings } = await getTemplateSettings();

  const { setting } = await getLaboratorySettings();
  const { settings } = setting || [];

  const { groups } = await getGroups();

  //   console.log(groups, 'THE GROUPS');

  return (
    <div className='w-full'>
      <h2>Edit Draft Tempalte</h2>
      <TemplateForm
        languages={languages}
        settings={settings}
        draft={draft}
        groups={groups}
        templateSettings={templateSettings}
      />
      <TemplateCollection draft={draft} />
    </div>
  );
};

export default page;
