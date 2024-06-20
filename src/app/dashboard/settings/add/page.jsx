// state/actions
import { getDraftSetting, getLanguages } from '../../apiCalls';

// components
import SettingsForm from '@/components/settings/settingsForm/SettingsForm';
import InsertSettings from '@/components/settings/insertSettingsForm/InsertSettings';
import DisplaySettings from '@/components/settings/DisplaySettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { languages } = await getLanguages();
	const { draft } = await getDraftSetting();

	return (
		<div>
			<h2>Add Settings</h2>
			<div className='flex'>
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
