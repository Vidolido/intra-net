// state/actions
import AddSettingsCollection from '@/components/settings/AddSettingsCollection';
import { getLanguages } from '../../apiCalls';
// import { makeDraftSetting } from '@/serverActions/settings';

// components
import InsertSettings from '@/components/settings/InsertSettings';
import SettingsForm from '@/components/settings/SettingsForm';
import { makeDraftSetting } from '@/serverActions/settings/makeDraftSetting';

const page = async () => {
  const { languages } = await getLanguages();
  const draft = JSON.parse(await makeDraftSetting());
  //   console.log(draft, 'THE DRAFT');
  return (
    <div>
      <h2>Add Settings</h2>
      <div className='flex flex-col gap-2'>
        <SettingsForm setting={draft} />
        {/* <InsertSettings languages={languages} />
				<AddSettingsCollection languages={languages} /> */}
      </div>
    </div>
  );
};

export default page;
