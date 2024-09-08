// components
import DisplaySettings from './DisplaySettings';
import HeaderForm from './HeaderForm';
import InsertSettingsForm from './InsertSettingsForm';
import OptionsSchema from './OptionsSchemaForm';

const Setting = ({ title, languages, sectors, setting }) => {
	return (
		<div className='min-w-[300px] max-w-fit'>
			<h2>{title}</h2>
			<div className='flex gap-2 min-w-80'>
				<div>
					<HeaderForm
						languages={languages}
						sectors={sectors}
						setting={setting}
					/>
					{setting.settingName && (
						<OptionsSchema setting={setting} languages={languages} />
					)}
					{setting.optionsSchema != null && (
						<InsertSettingsForm setting={setting} languages={languages} />
					)}
				</div>
				<DisplaySettings
					defaultLanguage={languages[0].language}
					languages={languages}
					settingId={setting._id}
					settings={setting.settings}
				/>
				{/* <DisplaySettings languages={languages} setting={setting} /> */}
			</div>
		</div>
	);
};

export default Setting;
