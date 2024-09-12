// components
import DisplaySettings from './displaySettingsOld/DisplaySettings';
import InsertSettings from './insertSettingsFormOld/InsertSettings';
import Header from './settingsComponentsOld/Header';
import OptionsSchema from './settingsComponentsOld/OptionsSchema';

const Settings = ({ title, setting, languages }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2 min-w-80'>
          <Header setting={setting} />
          {setting.settingName != null && (
            <OptionsSchema setting={setting} languages={languages} />
          )}

          {setting.settingName != null && setting.optionsSchema != null && (
            <InsertSettings languages={languages} setting={setting} />
          )}
        </div>
        <div>
          <DisplaySettings languages={languages} setting={setting} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
