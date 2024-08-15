// state/actions
import { getDraftSetting, getLanguages } from '../../apiCalls';

// components
import Setting from '@/components/settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { languages } = await getLanguages();
  const { draft } = await getDraftSetting();
  return (
    <Setting title='Add New Setting' setting={draft} languages={languages} />
  );
};

export default page;
