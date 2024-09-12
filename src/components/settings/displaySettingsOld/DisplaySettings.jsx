// state/actions
import { EditSettingsContextProvider } from '@/state/settings/editSetting/editSettingsState';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';

// components
import HeadingsTableRow from './HeadingsTableRow';
import TableRow from './TableRow';
import Wrapper from './Wrapper';

const DisplaySettings = async ({ languages, setting: dbSetting }) => {
  const { settings } = dbSetting;
  let mutSettings =
    settings &&
    settings.reduce((acc, currentValue) => {
      acc = {
        ...acc,
        [currentValue._id]: {
          showOptions: false,
          expand: false,
          edit: false,
        },
      };
      return acc;
    }, {});

  // Ова треба да го направам да зема од settings со највеќе полиња
  let headings =
    (settings && getDisplayHeadings(settings[0], 'singular')) || null;
  console.log(mutSettings, 'MUT SETTINGS');
  return (
    <div>
      <table>
        <thead>
          <HeadingsTableRow
            headings={headings}
            defaultLanguage={languages[0]}
          />
        </thead>
        <tbody>
          <EditSettingsContextProvider>
            <Wrapper options={mutSettings} settings={settings}>
              {settings &&
                settings.map((setting) => (
                  <TableRow
                    key={setting._id}
                    setting={setting._id}
                    document={dbSetting}
                    languages={languages}
                    defaultLanguage={languages[0]}
                  />
                ))}
            </Wrapper>
          </EditSettingsContextProvider>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default DisplaySettings;
