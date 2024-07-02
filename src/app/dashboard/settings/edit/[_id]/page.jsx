// state/actions
import { getLanguages, getPublishedById } from '@/app/dashboard/apiCalls';

// components
import DisplaySettings from '@/components/settings/displaySettings/DisplaySettings';
import InsertSettings from '@/components/settings/insertSettingsForm/InsertSettings';
import SettingsForm from '@/components/settings/settingsForm/SettingsForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { _id } = params;
  const { published } = await getPublishedById(_id);
  return (
    <div>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2'>
          <SettingsForm setting={published} />
          {!published.optionsSchema ? (
            ''
          ) : (
            <InsertSettings languages={languages} setting={published} />
          )}
        </div>
        <div>
          <h3>Settings</h3>
          <DisplaySettings languages={languages} setting={published} />
        </div>
      </div>
    </div>
  );
};

export default page;
