// state/actions
import { getDraftSetting, getLanguages, getSectors } from '../../apiCalls';

// components
import Setting from '@/components/Settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { languages } = await getLanguages();
  const { sectors } = await getSectors();

  const { draft } = await getDraftSetting();

  return (
    <Setting
      title='Add New Setting'
      languages={languages}
      sectors={sectors}
      setting={draft}
    />
  );
};

export default page;
