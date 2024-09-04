// state/actions
import {
  getLanguages,
  getSectors,
  getSettingById,
} from '@/app/dashboard/apiCalls';

// components
import Setting from '@/components/Settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { sectors } = await getSectors();

  const { _id } = params;
  const { setting } = await getSettingById(_id);

  // console.log(sectors, 'THE SECTORS');

  return (
    <Setting
      title='Edit Draft Setting'
      languages={languages}
      sectors={sectors}
      setting={setting}
    />
  );
};

export default page;
