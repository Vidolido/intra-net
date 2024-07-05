// components
import DisplaySettings from './displaySettings/DisplaySettings';
import InsertSettings from './insertSettingsForm/InsertSettings';
import Header from './settingsComponents/Header';
import OptionsSchema from './settingsComponents/OptionsSchema';
import SettingsForm from './settingsForm/SettingsForm';

const Settings = ({ title, setting, languages }) => {
	return (
		<div>
			<h2>{title}</h2>
			<div className='flex gap-2'>
				<div className='flex flex-col gap-2 min-w-80'>
					<Header setting={setting} />
					<OptionsSchema setting={setting} languages={languages} />
					{/* <SettingsForm setting={setting} /> */}
					{/* {!setting.optionsSchema ? (
						''
					) : (
						<InsertSettings languages={languages} setting={setting} />
					)} */}
					<InsertSettings languages={languages} setting={setting} />
				</div>
				<div>
					<DisplaySettings languages={languages} setting={setting} />
				</div>
			</div>
		</div>
	);
};

export default Settings;
