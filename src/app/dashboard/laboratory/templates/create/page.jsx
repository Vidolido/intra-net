// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';

// components
import TemplateForm from '@/components/templates/TemplateForm';
import { getDraftTemplate } from '../../apiCalls';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { draft } = await getDraftTemplate();
  const { languages } = await getLanguages();

  const { setting } = await getLaboratorySettings();
  const { settings } = (await setting) || [];

  // console.log(setting, 'settings in templates');
  console.log(draft, 'draft');
  return (
    <div className='w-full'>
      <h2>Create Tempalte</h2>
      <TemplateForm languages={languages} settings={settings} draft={draft} />
    </div>
  );
};

export default page;
