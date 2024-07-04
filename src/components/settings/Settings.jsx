import DisplaySettings from './displaySettings/DisplaySettings';
import InsertSettings from './insertSettingsForm/InsertSettings';
import Header from './settingsComponents/Header';
import SettingsForm from './settingsForm/SettingsForm';

const Settings = ({ title, setting, languages }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2'>
          <Header setting={setting} />
          <SettingsForm setting={setting} />
          {!setting.optionsSchema ? (
            ''
          ) : (
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
