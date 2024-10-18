// components
import HeaderForm from './HeaderForm';
import OptionsSchema from './OptionsSchemaForm';
import InsertSettingsForm from './InsertSettingsForm';
import DisplaySettings from './DisplaySettings';

const Setting = ({ title, languages, sectors, setting }) => {
	let optionsForSettings =
		setting && setting?.settings?.length > 0
			? setting?.settings?.map((setting) => ({
					_id: setting._id,
					showOptions: false,
					options: {
						edit: false,
						expand: false,
					},
			  }))
			: [];
	return (
		<div className='min-w-[300px] max-w-[85%]'>
			<h2>{title}</h2>
			<div className='flex gap-2 min-w-80'>
				<div className='min-w-[35%]'>
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
				{setting?.settings?.length > 0 && (
					<DisplaySettings
						defaultLanguage={languages[0].language}
						languages={languages}
						documentId={setting._id}
						optionsSchema={setting?.optionsSchema}
						settings={setting?.settings}
						optionsForSettings={optionsForSettings}
					/>
				)}
			</div>
		</div>
	);
};

export default Setting;
