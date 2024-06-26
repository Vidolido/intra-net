// state/actions
import { getDraftById, getLanguages } from '@/app/dashboard/apiCalls';

// components
import DisplaySettings from '@/components/settings/displaySettings/DisplaySettings';
import InsertSettings from '@/components/settings/insertSettingsForm/InsertSettings';
import SettingsForm from '@/components/settings/settingsForm/SettingsForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { _id } = params;
  const { draft } = await getDraftById(_id);
  return (
    <div>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2'>
          <SettingsForm setting={draft} />
          {!draft.optionsSchema ? (
            ''
          ) : (
            <InsertSettings languages={languages} setting={draft} />
          )}
        </div>
        <div>
          <h3>Settings</h3>
          <DisplaySettings languages={languages} setting={draft} />
        </div>
      </div>
    </div>
  );
};

export default page;
