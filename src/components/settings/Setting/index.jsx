// state/actions
// components
import DisplaySettings from '../displaySettings/DisplaySettings';
import HeaderForm from './HeaderForm';
import InsertSettingsForm from './InsertSettingsForm';
import OptionsSchema from './OptionsSchemaForm';

const Setting = ({ title, setting, languages }) => {
	return (
		<div className='min-w-[300px] max-w-fit'>
			<h2>{title}</h2>
			<div className='flex gap-2 min-w-80'>
				<div>
					<HeaderForm setting={setting} languages={languages} />
					{setting.settingName && (
						<OptionsSchema setting={setting} languages={languages} />
					)}
					{setting.optionsSchema != null && (
						<InsertSettingsForm setting={setting} languages={languages} />
					)}
				</div>
				<div>
					<DisplaySettings languages={languages} setting={setting} />
				</div>
			</div>
		</div>
	);
};

export default Setting;
