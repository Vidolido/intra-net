// state/actions
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';

// components
import TemplateForm from '@/components/templates/TemplateForm';

const page = async () => {
  const { languages } = await getLanguages();
  const { setting } = await getLaboratorySettings();
  const { settings } = (await setting) || [];

  // console.log(setting, 'settings in templates');
  return (
    <div>
      <h2>Create Tempalte</h2>
      <TemplateForm languages={languages} settings={settings} />
    </div>
  );
};

export default page;
