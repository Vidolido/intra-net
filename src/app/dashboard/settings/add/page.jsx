// state/actions
import { getLanguages } from '../../apiCalls';

// components
import InsertSettings from '@/components/settings/InsertSettings';
import SettingsForm from '@/components/settings/SettingsForm';

const page = async () => {
	const { languages } = await getLanguages();
	return (
		<div>
			<h3>Add Settings</h3>
			<SettingsForm />
			<hr />
			<InsertSettings languages={languages} />
		</div>
	);
};

export default page;
