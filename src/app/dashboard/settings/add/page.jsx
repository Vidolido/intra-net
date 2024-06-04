// state/actions
import { getDraftSetting, getLanguages } from '../../apiCalls';
// import { makeDraftSetting } from '@/serverActions/settings';

// components
import SettingsForm from '@/components/settings/SettingsForm';
import AddSettingsCollection from '@/components/settings/AddSettingsCollection';
import InsertSettings from '@/components/settings/InsertSettings';
import DisplaySettings from '@/components/settings/DisplaySettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { languages } = await getLanguages();
	// const draft = JSON.parse(await makeDraftSetting());
	const { draft } = await getDraftSetting();
	// console.log(draft, 'THE DRAFT');
	return (
		<div>
			<h2>Add Settings</h2>
			<div className='flex'>
				<div className='flex flex-col gap-2'>
					<SettingsForm setting={draft} />
					<InsertSettings languages={languages} />
					{/* <AddSettingsCollection languages={languages} /> */}
				</div>
				<div>
					<h3>Settings</h3>
					<DisplaySettings languages={languages} />
				</div>
			</div>
		</div>
	);
};

export default page;
