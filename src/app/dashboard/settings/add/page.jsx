// state/actions
import AddSettingsCollection from '@/components/settings/AddSettingsCollection';
import { getLanguages } from '../../apiCalls';

// components
import InsertSettings from '@/components/settings/InsertSettings';
import SettingsForm from '@/components/settings/SettingsForm';

const page = async () => {
	const { languages } = await getLanguages();
	return (
		<div>
			<h2>Add Settings</h2>
			<div className='flex flex-col gap-2'>
				<SettingsForm />
				{/* <InsertSettings languages={languages} />
				<AddSettingsCollection languages={languages} /> */}
			</div>
		</div>
	);
};

export default page;
