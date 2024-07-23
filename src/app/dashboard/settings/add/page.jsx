// state/actions
import { SettingsContextProvider } from '@/state/settingsContext';
import { getDraftSetting, getLanguages } from '../../apiCalls';

// components
import Settings from '@/components/settings/Settings';
import Setting from '@/components/settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const { languages } = await getLanguages();
  const { draft } = await getDraftSetting();
  return (
    <Setting title='Add New Setting' setting={draft} languages={languages} />
  );
  return (
    <SettingsContextProvider>
      <Settings title='Add New Setting' setting={draft} languages={languages} />
    </SettingsContextProvider>
  );
};

export default page;
