// state/actions
import { getLanguages, getSettingById } from '@/app/dashboard/apiCalls';

// components
import Setting from '@/components/settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { _id } = params;
  const { setting } = await getSettingById(_id);

  return (
    <Setting
      title='Edit Draft Setting'
      setting={setting}
      languages={languages}
    />
  );
};

export default page;
