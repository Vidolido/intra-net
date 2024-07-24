// state/actions
import { SettingsContextProvider } from '@/state/settingsContext';
import { getLanguages, getPublishedById } from '@/app/dashboard/apiCalls';

// components
import Settings from '@/components/settings/Settings';
import Setting from '@/components/settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { _id } = params;
  const { published } = await getPublishedById(_id);
  return (
    <Setting
      title='Add New Setting'
      setting={published}
      languages={languages}
    />
  );
  return (
    <SettingsContextProvider>
      <Settings
        title='Edit Setting'
        setting={published}
        languages={languages}
      />
    </SettingsContextProvider>
  );
};

export default page;
