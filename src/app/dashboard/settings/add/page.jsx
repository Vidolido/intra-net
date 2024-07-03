// state/actions
import { SettingsContextProvider } from '@/state/settingsContext';
import { getDraftSetting, getLanguages } from '../../apiCalls';

// components
import Settings from '@/components/settings/Settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { languages } = await getLanguages();
	const { draft } = await getDraftSetting();

	return (
		<SettingsContextProvider>
			<Settings title='Add New Setting' setting={draft} languages={languages} />
		</SettingsContextProvider>
	);
};

export default page;
