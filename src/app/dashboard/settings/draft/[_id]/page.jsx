// state/actions
import { SettingsContextProvider } from '@/state/settingsContext';
import { getDraftById, getLanguages } from '@/app/dashboard/apiCalls';

// components
import Settings from '@/components/settings/Settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
	const { languages } = await getLanguages();
	const { _id } = params;
	const { draft } = await getDraftById(_id);
	return (
		<SettingsContextProvider>
			<Settings
				title='Edit Draft Setting'
				setting={draft}
				languages={languages}
			/>
		</SettingsContextProvider>
	);
};

export default page;
